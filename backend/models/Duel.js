import mongoose from "mongoose";

const DuelSchema = new mongoose.Schema({
  title: String,       // titre du duel
  optionA: String,     // URL vidéo A
  optionB: String,     // URL vidéo B
  votesA: { type: Number, default: 0 },
  votesB: { type: Number, default: 0 }
});

export default mongoose.model("Duel", DuelSchema);
