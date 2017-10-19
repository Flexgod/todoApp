const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
//Controller to get login page
exports.getLogin = (req, res) => {
    res.render('login', {title: 'Login'});
}
//Controller to get register page
exports.getRegister = (req, res) => {
    res.render('register', {title: 'Register'});
}
//MiddleWare to validate user data submitted
exports.validateRegister = (req, res, next) => {
    req.checkBody('email', 'That Email is not valid').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password cannot be Blank!').notEmpty();
    req.checkBody('password-confirm', 'COnfirm Password cannot be empty!').notEmpty();
    req.checkBody('password-confirm', 'Your Passwords do not match').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
        //STop fn from running
        return;
    }
    next();
}
//Controller to regsiter user
exports.registerUser = async (req, res, next) => {
    const user = new User({email: req.body.email});
    const registerWithPromise = promisify(User.register, User);
    await registerWithPromise(user, req.body.password);
    next()
}
//Controller to get user account
exports.account = (req, res) => {
    res.render('account', {title: 'Edit My Account'});
}
//Controller to update user account
exports.updateAccount = async (req, res) => {
    const updates = {
        email: req.body.email
    };
    const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query' }
    );
    req.flash('success', 'Updated Profile! Login to continue');
    res.redirect('/');
}