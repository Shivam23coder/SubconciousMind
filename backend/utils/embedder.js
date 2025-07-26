import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs-node';

let model = null;

// Load the model once
export async function loadModel() {
  if (!model) {
    model = await use.load();
    console.log('USE model loaded');
  }
}

// Embed a single sentence
export async function getEmbedding(text) {
  if (!model) await loadModel();

  const embeddings = await model.embed([text]);
  const array = embeddings.arraySync(); // Get raw JS array
  return array[0]; // Return first (and only) vector
}
