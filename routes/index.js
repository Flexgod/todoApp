var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todoController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

/* GET home page. */
router.get('/', todoController.getHomePage);
/* GET all Tasks. */
router.get('/tasks', authController.isLoggedIn, todoController.getAllTasks);
/* GET Edit Task Page. */
router.get('/tasks/:id/edit', authController.isLoggedIn, todoController.editTask);
/* GET Task By SLug. */
router.get('/tasks/:id', authController.isLoggedIn, todoController.getTaskBySlug);
/* GET add new Task. */
router.get('/add', authController.isLoggedIn, todoController.addTask);
/* GET login. */
router.get('/login', userController.getLogin);
/* GET register page. */
router.get('/register', userController.getRegister);
/* Login User. */
router.post('/login', authController.login);
/* Register User. */
router.post('/register',
    userController.validateRegister,
    userController.registerUser,
    authController.login
);
/* Logout User. */
router.get('/logout', authController.logout);
//Route to get user account
router.get('/account', authController.isLoggedIn ,userController.account);
//Route to post new task
router.post('/add', todoController.addNewTask);

module.exports = router;
