const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/trendbattle", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Duel Schema
const DuelSchema = new mongoose.Schema({
  title: String,
  optionA: String,
  optionB: String,
  votesA: { type: Number, default: 0 },
  votesB: { type: Number, default: 0 }
});

const Duel = mongoose.model("Duel", DuelSchema);

// Routes
app.get("/api/duels", async (req, res) => {
  try {
    const duels = await Duel.aggregate([{ $sample: { size: 20 } }]);
    res.json(duels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/duels/:id/vote", async (req, res) => {
  try {
    const { choice } = req.body;
    const duel = await Duel.findById(req.params.id);
    if (!duel) return res.status(404).send("Not found");

    if (choice === "A") duel.votesA++;
    else duel.votesB++;

    await duel.save();
    res.json(duel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => console.log("🔥 Backend running on http://localhost:4000"));
