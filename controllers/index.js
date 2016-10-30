var passport = require('passport')
var User = require('../models/user')

function viewhome (req, res) {
    console.log(req.user)

    User.find({}, function (err, data) {
        res.render('index', { user: req.user, list:data })
    })
}

function viewRegister (req, res) {
    res.render('register', {})
}
function viewLogin (req, res) {
    res.render('login', {})
}


function localRegister(req, res, next) {
    User.register(new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    }), req.body.password, function (err) {
        if (err) {
            console.log(err)
            return res.render('login', {})
        }

        console.log('user register')

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    console.log(err)
                    return next(err)
                }
                res.redirect('/')
            })
        })
    })
}

function login(req, res) {
    res.redirect('/')
}

function isAuthenticate (req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}

function isLogin (req, res, next) {
    if (req.isAuthenticated())
        res.redirect('/');

    return next();
}

function logout (req, res) {
    req.session.destroy()
    res.redirect('/login')
}

module.exports = {
    viewHome: viewhome,
    viewRegister: viewRegister,
    viewLogin: viewLogin,
    localRegister: localRegister,
    login: login,
    isAuthenticate:isAuthenticate,
    isLogin: isLogin,
    logout: logout
}