import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Duel from "./models/Duel.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB local
mongoose.connect("mongodb://127.0.0.1:27017/trendbattle", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Récupérer 20 duels aléatoires
app.get("/api/duels", async (req, res) => {
  const duels = await Duel.aggregate([{ $sample: { size: 20 } }]);
  res.json(duels);
});

// Voter
app.post("/api/duels/:id/vote", async (req, res) => {
  const { choice } = req.body;
  const duel = await Duel.findById(req.params.id);
  if (!duel) return res.status(404).json({ error: "Duel non trouvé" });

  if (choice === "A") duel.votesA++;
  else if (choice === "B") duel.votesB++;

  await duel.save();
  res.json(duel);
});

app.listen(5000, () => console.log("✅ Backend lancé sur http://localhost:5000"));
