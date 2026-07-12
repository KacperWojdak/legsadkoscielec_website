import { createClient } from "@sanity/client";
import { config } from "dotenv";
config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

async function deleteAllMatches() {
  const ids: string[] = await client.fetch(`*[_type == "match"]._id`);
  console.log(`Usuwam ${ids.length} meczów...`);
  for (const id of ids) {
    await client.delete(id);
    console.log(`🗑️  Usunięto: ${id}`);
  }
  console.log("Gotowe!");
}

deleteAllMatches().catch(console.error);