import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import path from "path";
import { config } from "dotenv";
config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

type Player = {
  id: number;
  name: string;
  position: string;
  number: number;
  photoCard: string;
  photoModal: string;
};

async function uploadImage(filename: string): Promise<string | undefined> {
  try {
    const filePath = path.join(process.cwd(), "public", "images", "players", filename);
    const buffer = readFileSync(filePath);
    const asset = await client.assets.upload("image", buffer, { filename });
    return asset._id;
  } catch (err) {
    console.warn(`⚠️  Nie udało się wgrać zdjęcia: ${filename}`, err);
    return undefined;
  }
}

async function importPlayers() {
  const playersData: Player[] = JSON.parse(
    readFileSync(path.join(process.cwd(), "data", "players.json"), "utf-8")
  );

  console.log(`Znaleziono ${playersData.length} zawodników do zaimportowania.`);

  for (const player of playersData) {
    console.log(`Importuję: ${player.name}...`);

    const photoCardAssetId = await uploadImage(player.photoCard);
    const photoModalAssetId =
      player.photoModal !== player.photoCard
        ? await uploadImage(player.photoModal)
        : photoCardAssetId;

    type PlayerDoc = {
    _type: "player";
    name: string;
    position: string;
    number: number;
    isActive: boolean;
    photoCard?: { _type: "image"; asset: { _type: "reference"; _ref: string } };
    photoModal?: { _type: "image"; asset: { _type: "reference"; _ref: string } };
    };

    const doc: PlayerDoc = {
    _type: "player",
    name: player.name,
    position: player.position,
    number: player.number,
    isActive: true,
    };

    if (photoCardAssetId) {
      doc.photoCard = {
        _type: "image",
        asset: { _type: "reference", _ref: photoCardAssetId },
      };
    }
    if (photoModalAssetId) {
      doc.photoModal = {
        _type: "image",
        asset: { _type: "reference", _ref: photoModalAssetId },
      };
    }

    const created = await client.create(doc);
    console.log(`✅ Utworzono: ${created._id}`);
  }

  console.log("Import zawodników zakończony!");
}

importPlayers().catch((err) => {
  console.error("Błąd importu:", err);
  process.exit(1);
});