import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  originalText: { type: String, required: true },
  transformedText: { type: String },
  transformationType: { type: String, enum: ['pitch', 'poem', 'plan','blend'], required: true },
  blendedWith: { type: String }, // optional for blending
  dnaMapping: { type: Object },  // key parts origin
}, { timestamps: true });

export default mongoose.model('Idea', ideaSchema);