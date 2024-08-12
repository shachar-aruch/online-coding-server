const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exercises');

router.get('/', exerciseController.getAllExercises);