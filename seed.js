const mongoose = require("mongoose");
const faker = require("faker");

mongoose.connect("mongodb://127.0.0.1:27017/trendbattle");

const DuelSchema = new mongoose.Schema({
  title: String,
  optionA: String,
  optionB: String,
  votesA: { type: Number, default: 0 },
  votesB: { type: Number, default: 0 }
});

const Duel = mongoose.model("Duel", DuelSchema);

(async () => {
  console.log("🚀 Seeding 1,000,000 duels...");
  let bulk = [];
  for (let i = 0; i < 1000000; i++) {
    bulk.push({
      title: faker.lorem.words(3),
      optionA: `https://picsum.photos/400?random=${i}`,
      optionB: `https://picsum.photos/400?random=${i + 1000000}`
    });

    if (bulk.length === 10000) {
      await Duel.insertMany(bulk);
      bulk = [];
      console.log(`${i} duels insérés`);
    }
  }
  console.log("✅ Done");
  process.exit();
})();
