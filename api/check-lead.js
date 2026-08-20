// API Endpoint to check if a lead exists
module.exports = (req, res) => {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  // Mock response: Replace with actual database logic
  const leadExists = Math.random() > 0.5; // Randomly return true/false for testing
  
  res.status(200).json({
    exists: leadExists,
    phone,
    message: leadExists ? "Lead exists" : "Lead does not exist",
  });
};