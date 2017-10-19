const mongoose = require('mongoose');
const Todo = mongoose.model('Activity');
const promisify = require('es6-promisify');
//Controller to get the homepage
exports.getHomePage = (req, res) => {
    res.render('index', { title: 'Todo List' });
}
//COnfirm Todo owner
const todoOwner = (todo, user) => {
    if (!todo.author.equals(user._id)) {
        throw Error('You must own a Todo to edit it!');
    }
}
//Controller to get all task for the user
exports.getAllTasks = async (req, res) => {
    //Query the Database for all the Stores in the DB
    const todos = await Todo.find();
    res.render('tasks', { title: 'All Tasks', todos });
}
//COntroller to edit task
exports.editTask = async (req, res) => {
    // fetch id sent from the url and query db for store
    const todo = await Todo.findOne({ _id: req.params.id }).populate('author');
    todoOwner(todo, req.user);
    res.render('editTodo', { title: `Edit ${todo.title}`, todo });
}
//COntroller to get todo by slug
exports.getTaskBySlug = async (req, res) => {
    //Get the store based on the id
    const todo = await Todo.findOne({ slug: req.params.slug }).populate('author');
    if (!todo) {
        next();
        return;
    }
    todoOwner(todo, req.user);
    res.render('task', { title: todo.title, todo });
}
//COntroller to handle add new task
exports.addTask = (req, res) => {
    res.render('editTodo', { title: 'Add New Task' });
}
//Controller to post new tasks
exports.addNewTask = async (req, res) => {
    req.body.author = req.user._id;
    const todo = await (new Todo(req.body)).save();
    req.flash('success', `Successfully Created ${todo.title}.`);
    res.redirect(`/tasks`);
}
//Controller to update tasks
exports.updateTodo = async (req, res) => {
    //Find and Update the Todo
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, /*return the new store insead of the old one*/ runValidatos: true }).exec();
    req.flash('success', `Successfully updated ${todo.title}`);
    res.redirect(`/tasks/${todo.slug}`);
}
//Controller to Delete tasks
exports.deleteTodo = async (req, res) => {
    //Find and Update the Todo
    const todo = await Todo.findOneAndRemove({ _id: req.params.id }).exec();
    req.flash('success', `Successfully Deleted the task`);
    res.redirect(`/tasks`);
}
//COntroller to add Activity to Tasks
exports.addActivity = async (req, res) => {
    const todo = Todo.update(
        { _id: req.body.id },
        { $addToSet: { todoList: req.body.activity } }, function (err, todo) {
            if (err) {
                req.flash('error', 'Something went wrong. Please try again!');
                res.redirect(`/tasks/${req.body.slug}`);
            } else {
                req.flash('success', 'New Activity Added to Todo!');
                res.redirect(`/tasks/${req.body.slug}`);
            }
        }
    );
}
//Controlloer to remove activites from the todo send activity
exports.removeActivity = async (req, res) => {
    const todo = await Todo.update(
        { _id: req.body.todo_id },
        { $pull: { todoList: req.body.todo_activity } }, function (err, todo) {
            if (err) {
                req.flash('error', 'Something went wrong. Please try again!');
                res.redirect(`/tasks/${req.body.todo_slug}`);
            } else {
                req.flash('success', 'Activity Removed from Todo!');
                res.redirect(`/tasks/${req.body.todo_slug}`);
            }
        }
    );
}
