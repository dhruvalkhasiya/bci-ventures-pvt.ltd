import app from "./app";
import { env } from "./config/environment";
import { connectDatabase } from "./config/database";

async function start() {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      console.log(`BCI Ventures backend running on port ${env.port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
