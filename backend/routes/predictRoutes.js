const express = require("express");
const { predictDisease } = require("../controllers/predictController");

const router = express.Router();

router.post("/p1", predictDisease);

module.exports = router;
