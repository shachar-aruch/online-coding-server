const exercise = require("../models/exercises");
exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await exercise.findAll();
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
