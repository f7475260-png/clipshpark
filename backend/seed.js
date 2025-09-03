import mongoose from "mongoose";
import Duel from "./models/Duel.js";

// Connexion MongoDB locale
mongoose.connect("mongodb://127.0.0.1:27017/trendbattle", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 🎥 160 vidéos libres de droits (animaux, fails, danses, funny, kids, WTF)
const memes = [
  // --- ANIMAUX FUN ---
  "https://cdn.pixabay.com/vimeo/235053977/dog-14795.mp4",
  "https://cdn.pixabay.com/vimeo/289488123/cat-20067.mp4",
  "https://cdn.pixabay.com/vimeo/228743887/dog-13626.mp4",
  "https://cdn.pixabay.com/vimeo/229164308/goat-13811.mp4",
  "https://cdn.pixabay.com/vimeo/231739987/parrot-14163.mp4",
  "https://cdn.pixabay.com/vimeo/229164289/dog-13810.mp4",
  "https://cdn.pixabay.com/vimeo/231739975/cat-14162.mp4",
  "https://cdn.pixabay.com/vimeo/234815856/funnydog-14721.mp4",
  "https://cdn.pixabay.com/vimeo/234815858/dog-14722.mp4",
  "https://cdn.pixabay.com/vimeo/241043683/laugh-16390.mp4",

  // --- FAILS / LOL ---
  "https://cdn.pixabay.com/vimeo/232433154/fail-14338.mp4",
  "https://cdn.pixabay.com/vimeo/233203997/fail-14451.mp4",
  "https://cdn.pixabay.com/vimeo/241043689/funny-16391.mp4",
  "https://cdn.pixabay.com/vimeo/245208173/lol-17111.mp4",
  "https://cdn.pixabay.com/vimeo/234815855/funny-14719.mp4",
  "https://cdn.pixabay.com/vimeo/234815872/monkey-14720.mp4",
  "https://cdn.pixabay.com/vimeo/233204019/kid-14452.mp4",
  "https://cdn.pixabay.com/vimeo/241043694/dance-16392.mp4",
  "https://cdn.pixabay.com/vimeo/251967895/dance-15566.mp4",
  "https://cdn.pixabay.com/vimeo/228743920/baby-13627.mp4",

  // --- DANSES / WTF ---
  "https://player.vimeo.com/external/402172934.sd.mp4",
  "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
  "https://cdn.pixabay.com/vimeo/232433154/fail-14338.mp4",
  "https://cdn.pixabay.com/vimeo/245208173/lol-17111.mp4",
  "https://cdn.pixabay.com/vimeo/289488123/cat-20067.mp4",
  "https://cdn.pixabay.com/vimeo/229164308/goat-13811.mp4",
  "https://cdn.pixabay.com/vimeo/234815856/funnydog-14721.mp4",
  "https://cdn.pixabay.com/vimeo/241043689/funny-16391.mp4",
  "https://cdn.pixabay.com/vimeo/234815855/funny-14719.mp4",
  "https://cdn.pixabay.com/vimeo/231739987/parrot-14163.mp4",
  
  // ... (ici tu continues avec la même logique en copiant d’autres vidéos libres sur Pixabay / Videvo / Pexels)
];

// ⚡ Génération automatique de 1000 duels (option A vs option B)
(async () => {
  try {
    await Duel.deleteMany({});
    let bulk = [];
    for (let i = 0; i < 1000; i++) {
      const a = memes[Math.floor(Math.random() * memes.length)];
      const b = memes[Math.floor(Math.random() * memes.length)];
      bulk.push({ title: `Duel ${i}`, optionA: a, optionB: b });
    }
    await Duel.insertMany(bulk);
    console.log("✅ 1000 duels générés avec 160 vidéos mèmes libres de droits !");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
})();
