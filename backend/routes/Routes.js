
const express = require('express');
const controller = require('../controller/Controller');
const authMiddleware = require('../middlewares/authMiddleware');

const route = express.Router();

route.use(authMiddleware);

route.get('/',controller.get_workouts);
route.get('/addWorkout',controller.add_workout_get);
route.post('/',controller.add_workout_post);
route.delete('/:id',controller.delete_workout);

module.exports = route;
