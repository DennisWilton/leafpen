import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
  },
  valor: {
    type: Number,
    required: true,
  },
  saldoDisponivel: {
    type: Number,
  },
  tags: {
    type: [String],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model(`Empenho`, Schema);
