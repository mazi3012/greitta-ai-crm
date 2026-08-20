// API Endpoint to claim a lead
module.exports = (req, res) => {
  const { phone, userId } = req.body;

  if (!phone || !userId) {
    return res.status(400).json({ error: "Phone and userId are required" });
  }

  // Mock response: Replace with actual database logic
  const success = Math.random() > 0.2; // 80% chance of success for testing
  
  if (success) {
    res.status(200).json({
      success: true,
      phone,
      userId,
      message: "Lead claimed successfully",
    });
  } else {
    res.status(400).json({
      success: false,
      phone,
      userId,
      message: "Failed to claim lead",
    });
  }
};