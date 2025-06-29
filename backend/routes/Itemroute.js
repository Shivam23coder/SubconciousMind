import { Router } from 'express';
import Item from '../models/Itemmodel.js';
import { cosineSimilarity } from '../utils/similarity.js';
import axios from 'axios';

const router = Router();

async function getEmbeddingFromPython(text) {
  const res = await axios.post('http://localhost:8000/embed', { text });
  return res.data.embedding;
}

// 1. Add Item
router.post('/add', async (req, res) => {
  try {
    const { name, location } = req.body;
    if (!name || !location) {
      return res.status(400).json({ message: 'Name and location are required' });
    }
    const embedding = await getEmbeddingFromPython(name);
    const newItem = new Item({ name, location, embedding });
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    console.error('Add item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 2. Get All Items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// 3. Search Item
router.post('/search', async (req, res) => {
  const { query } = req.body;
  const queryEmbedding = await getEmbeddingFromPython(query);
  const items = await Item.find();

  let bestItem = null;
  let bestScore = -1;

  for (let item of items) {
    const score = cosineSimilarity(queryEmbedding, item.embedding);
    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  }

  if (bestItem) {
    res.json({ item: bestItem, score: bestScore });
  } else {
    res.status(404).json({ message: 'No match found' });
  }
});

export default router;
