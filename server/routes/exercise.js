const express = require('express');
const router = express.Router();
const { verifyToken } = require('../services/authService');
const { createNewExercise,getExercises} = require('../BL/Logic/exercise.js');


// Route for creating an exercise
router.post('/', createNewExercise);
  
  // Route for reading exercises
  router.get('/:id?',verifyToken, getExercises );
  
  // Route for updating an exercise
  router.put('/:id', async (req, res) => {
    try {
      const updatedExercise = await update(req.params.id, req.body);
      res.status(200).json(updatedExercise);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update exercise' });
    }
  });
  
  // Route for deleting an exercise
  router.delete('/:id', async (req, res) => {
    try {
      await remove(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete exercise' });
    }
  });

  module.exports = router;
