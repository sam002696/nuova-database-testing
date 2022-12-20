const Prospects = require("../models/Prospects");

const router = require("express").Router();

// post prospect

router.post("/", async (req, res) => {
  const newProspect = new Prospects(req.body);
  try {
    const savedProspect = await newProspect.save();

    res.status(200).json(savedProspect);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
