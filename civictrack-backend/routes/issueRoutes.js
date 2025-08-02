router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
});
