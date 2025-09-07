import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Duel from "./models/Duel.js";

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/trendbattle";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error("❌ Erreur MongoDB:", err));

// Récupérer 20 duels aléatoires
app.get("/api/duels", async (req, res) => {
  const duels = await Duel.aggregate([{ $sample: { size: 20 } }]);
  res.json(duels);
});

// Voter pour un duel
app.post("/api/duels/:id/vote", async (req, res) => {
  const { id } = req.params;
  const { choice } = req.body;

  const duel = await Duel.findById(id);
  if (!duel) return res.status(404).json({ error: "Duel introuvable" });

  if (choice === "A") duel.votesA++;
  else if (choice === "B") duel.votesB++;

  await duel.save();
  res.json(duel);
});

app.listen(5000, () => console.log("🚀 Backend sur http://localhost:5000"));
