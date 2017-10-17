exports.getHomePage = (req, res) => {
    res.render('index', {title: 'Todo List'});
}

exports.getAllTasks = (req, res) => {
    res.render('tasks', {title: 'All Tasks'});
}

exports.editTask = (req, res) => {
    res.render('editTodo', {title: 'Edit Task Name'});
}

exports.getTaskBySlug = (req, res) => {
    res.render('index', {title: 'Task Name'});
}

exports.addTask = (req, res) => {
    res.render('editTodo', { title: 'Add New Task'});
}