import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  "cars and vehicles",
  "comedy",
  "education",
  "entertainment",
  "film and animation",
  "gaming",
  "how-to and style",
  "music",
  "news and politics",
  "people and blogs",
  "pets and animals",
  "science and technology",
  "sports",
  "travel and events",
];

async function main() {
  console.log("Seeding categories...");

  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Videos realted to ${name.toLowerCase()}`,
    }));

    await db.insert(categories).values(values);
    console.log("Categories seeded successfully");
  } catch (e) {
    console.error("Error seeding categories", e);
  }
}

main();
