module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({
    status: "ok",
    service: "BCI Backend API Health CommonJS Test",
    timestamp: new Date().toISOString(),
  });
};
