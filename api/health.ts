export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({
    status: "ok",
    service: "BCI Backend API Health Direct Test",
    timestamp: new Date().toISOString(),
  });
}
