// Telegram Bot Webhook Endpoint
module.exports = (req, res) => {
  res.status(200).json({ status: "Bot webhook is active" });
};