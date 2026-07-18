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
    "https://t3.storageapi.dev/gtfs-storage-bq-44dvc-6s/GTFS_Dublin_Bus.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=tid_zujxotXJKvNhgQSvqnGbPnoQvjxmftBmlrLIpMpHxTqpy_LMMd%2F20260718%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260718T113250Z&X-Amz-Expires=3600&X-Amz-Signature=4cc843c04c0fa269355a9267792579e729762a2bd5709a55b41d75aa8704aeb1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
    "./gtfs/dublinbus"
  );

  await downloadAndExtract(
    "https://t3.storageapi.dev/gtfs-storage-bq-44dvc-6s/GTFS_Irish_Rail.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=tid_zujxotXJKvNhgQSvqnGbPnoQvjxmftBmlrLIpMpHxTqpy_LMMd%2F20260718%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260718T113307Z&X-Amz-Expires=3600&X-Amz-Signature=78d275fb7ef51e77ba2330110b284fce9317b91bcd1c93572b7511016b325f7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
    "./gtfs/irishrail"
  );

  await downloadAndExtract(
    "https://t3.storageapi.dev/gtfs-storage-bq-44dvc-6s/GTFS_Bus_Eireann.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=tid_zujxotXJKvNhgQSvqnGbPnoQvjxmftBmlrLIpMpHxTqpy_LMMd%2F20260718%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260718T112352Z&X-Amz-Expires=3600&X-Amz-Signature=2070ee6264e4a015c42987d0ae2c81f7427a4457d89a26fa6c999d1346ec82a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
    "./gtfs/buseireann"
  );

  await downloadAndExtract(
    "https://t3.storageapi.dev/gtfs-storage-bq-44dvc-6s/GTFS_LUAS.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=tid_zujxotXJKvNhgQSvqnGbPnoQvjxmftBmlrLIpMpHxTqpy_LMMd%2F20260718%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260718T113311Z&X-Amz-Expires=3600&X-Amz-Signature=a7d711586f8c9f54a711e0a02eef9266b01bf7a5a2fe28f82c9c03e4d602f51a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
    "./gtfs/luas"
  );

  console.log("All GTFS downloaded and extracted.");
}

main();
