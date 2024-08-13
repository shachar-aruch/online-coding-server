const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exercises");

router.get("/", exerciseController.getAllExercises);
router.post("/output", exerciseController.checkOutputById);

module.exports = router;
