import mongoose from "mongoose";

const duelSchema = new mongoose.Schema({
  optionA: String,
  optionB: String,
  votesA: { type: Number, default: 0 },
  votesB: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Duel", duelSchema);
