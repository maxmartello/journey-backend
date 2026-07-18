import fs from "fs";
import fetch from "node-fetch";
import unzipper from "unzipper";

async function downloadAndExtract(url, outputFolder) {
  console.log("Downloading:", url);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to download " + url);

  await fs.promises.mkdir(outputFolder, { recursive: true });

  await new Promise((resolve, reject) => {
    res.body
      .pipe(unzipper.Extract({ path: outputFolder }))
      .on("close", resolve)
      .on("error", reject);
  });

  console.log("Extracted to:", outputFolder);
}

async function main() {
  await downloadAndExtract(
    "https://railway.app/bucket/gtfs-storage/GTFS_Dublin_Bus.zip",
    "./gtfs/dublinbus"
  );

  await downloadAndExtract(
    "https://railway.app/bucket/gtfs-storage/GTFS_Irish_Rail.zip",
    "./gtfs/irishrail"
  );

  await downloadAndExtract(
    "https://railway.app/bucket/gtfs-storage/GTFS_GoAhead.zip",
    "./gtfs/goahead"
  );

  await downloadAndExtract(
    "https://railway.app/bucket/gtfs-storage/GTFS_Luas.zip",
    "./gtfs/luas"
  );

  console.log("All GTFS downloaded and extracted.");
}

main();
