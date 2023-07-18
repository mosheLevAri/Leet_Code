const {
  create,
  read,
  update,
  remove,
} = require("../../DL/Controller/exerciseController.js");

async function createNewExercise(req, res) {
  try {
    const exercise = await create(req.body);
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ error: "Failed to create exercise" });
  }
}

async function getExercises(req, res) {
  try {

    let exercises;
    const exerciseId = req.params.id;

    if (exerciseId) {
      exercises = await read({ _id: exerciseId });
    } else {
      exercises = await read();
    }

    res.status(200).send(exercises);
  } catch (error) {
    const result = {
      status: 400,
      message: error.message || error,
    };
    res.status(400).send(result);
  }
}

module.exports = {
  createNewExercise,
  getExercises,
};
