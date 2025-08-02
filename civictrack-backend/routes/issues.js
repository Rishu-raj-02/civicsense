// routes/issues.js
const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");

router.post("/", async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    await newIssue.save();
    res.status(201).json({ message: "✅ Issue saved!" });
  } catch (error) {
    console.error("❌ Save error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
