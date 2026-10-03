import app from "./app";
import { env } from "./config/environment";
import { connectDatabase } from "./config/database";

async function start() {
  app.listen(env.port, () => {
    console.log(`BCI Ventures backend running on port ${env.port}`);
  });
  connectDatabase().catch((err) => {
    console.error("MongoDB unavailable; registrations will be saved to the workbook only:", err);
  });
}

start();
