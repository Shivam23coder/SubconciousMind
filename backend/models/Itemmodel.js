import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: String,
  location: String,
  embedding: [Number],
});

export default mongoose.model('Item', itemSchema);
