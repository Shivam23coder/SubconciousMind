import { Router } from 'express';
import Item from '../models/Itemmodel.js';
import { cosineSimilarity } from '../utils/similarity.js';
import axios from 'axios';

const router = Router();

async function getEmbeddingFromPython(text) {
  try {
    const res = await axios.post('https://subconciousmind-3.onrender.com/embed', { text });
    return res.data.embedding;
  } catch (err) {
    console.error('Python embedding error:', err.response?.data || err.message);
    throw new Error('Failed to get embedding from Python');
  }
}


// 1. Add Item
router.post('/add', async (req, res) => {
  try {
    const { name, location } = req.body;
    if (!name || !location) {
      return res.status(400).json({ message: 'Name and location are required' });
    }

    console.log("Received:", req.body);

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

  // 1. Try direct keyword search (case-insensitive partial match)
  const keywordMatch = await Item.findOne({ name: { $regex: query, $options: 'i' } });

  if (keywordMatch) {
    return res.json({ item: keywordMatch, source: 'keyword' });
  }

  // 2. Otherwise fallback to vector similarity search
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
    res.json({ item: bestItem, source: 'vector', score: bestScore });
  } else {
    res.status(404).json({ message: 'No match found' });
  }
});

// 5. Delete an Item
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {name, location} = req.body;
    if (!name || !location)
        res.status(400).json({message: 'Name and location are required'});
    const embedding = await getEmbeddingFromPython(name);

    //find by id and update
    const updatedItem = await Item.findByIdAndUpdate(id, {name, location, embedding}, {new: true});
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found'});
    }

    await updatedItem.save();
    res.json({message: 'Item updated successfully', updatedItem});    
  } catch (error) {
    console.error('Update item error:', error);
  }
});

export default router;