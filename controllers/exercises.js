const exercise = require("../models/exercises");

exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await exercise.findAll({ order: ["id"] });
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.checkOutputById = async ({ body }, res) => {
  try {
    const solution = (await exercise.findOne({ where: { id: body.id } }))
      .solution;
    res.json({ pass: body.output === solution ? true : false });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
