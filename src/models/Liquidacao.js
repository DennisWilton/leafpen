import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
  },
  active: {
    type: Boolean,
    default: true,
  },
  empenho: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empenho",
    required: true,
  },
});

export default mongoose.model(`Liquidacao`, Schema);
