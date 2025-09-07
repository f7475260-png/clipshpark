import mongoose from "mongoose";
import fs from "fs";
import Duel from "./models/Duel.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/trendbattle";

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("✅ Connecté à MongoDB");

  const memes = JSON.parse(fs.readFileSync("memes.json", "utf8"));

  if (memes.length < 2) {
    console.error("❌ Ajoute au moins 2 vidéos dans memes.json");
    process.exit(1);
  }

  await Duel.deleteMany({});
  console.log("🗑️ Anciennes données supprimées");

  const duels = [];
  for (let i = 0; i < 10000; i++) {
    const optionA = memes[Math.floor(Math.random() * memes.length)];
    const optionB = memes[Math.floor(Math.random() * memes.length)];
    if (optionA !== optionB) {
      duels.push({ optionA, optionB });
    }
  }

  await Duel.insertMany(duels);
  console.log(`🔥 ${duels.length} duels insérés`);
  mongoose.disconnect();
}

seed();
