var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todoController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

/* GET home page. */
router.get('/', todoController.getHomePage);
/* GET all Tasks. */
router.get('/tasks', todoController.getAllTasks);
/* GET Edit Task Page. */
router.get('/tasks/:id/edit', todoController.editTask);
/* GET Task By SLug. */
router.get('/tasks/:id', todoController.getTaskBySlug);
/* GET add new Task. */
router.get('/add', todoController.addTask);
/* GET login. */
router.get('/login', userController.getLogin);
/* GET register page. */
router.get('/register', userController.getRegister);
/* Login User. */
router.post('/login', authController.login);
/* Register User. */
router.post('/register', authController.register);

module.exports = router;
