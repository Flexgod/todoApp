const mongoose = require('mongoose');
const Todo = mongoose.model('Activity');
const promisify = require('es6-promisify');
//Controller to get the homepage
exports.getHomePage = (req, res) => {
    res.render('index', { title: 'Todo List' });
}
//Controller to get all task for the user
exports.getAllTasks = (req, res) => {
    res.render('tasks', { title: 'All Tasks' });
}
//COntroller to edit task
exports.editTask = (req, res) => {
    res.render('editTodo', { title: 'Edit Task Name' });
}
//COntroller to get todo by slug
exports.getTaskBySlug = (req, res) => {
    res.render('index', { title: 'Task Name' });
}
//COntroller to handle add new task
exports.addTask = (req, res) => {
    res.render('editTodo', { title: 'Add New Task' });
}

exports.addNewTask = async (req, res) => {
    req.body.author = req.user._id;
    const todo = await (new Todo(req.body)).save();
    req.flash('success', `Successfully Created ${todo.title}.`);
    res.redirect(`/`);
}