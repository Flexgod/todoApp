exports.getLogin = (req, res) => {
    res.render('login', {title: 'Login'});
}

exports.getRegister = (req, res) => {
    res.render('register', {title: 'Register'});
}