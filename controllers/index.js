var passport = require('passport')
var User = require('../models/user')

function viewhome (req, res) {
    User.find({}, function (err, data) {
        res.render('index', { user: req.user, list:data })
    })
}

function viewRegister (req, res) {
    res.render('register', {})
}
function viewLogin (req, res) {
    res.render('login', { message: req.flash('message') })
}


function localRegister(req, res, next) {
    User.register(new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        role: 'siswa',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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

function viewEdit(req, res) {
    User.findOne({
        _id: req.params.id
    }, function (err, data) {
        if (err) {
            console.log(err)
        }
        res.render('edit', { user: data })
    })
}

function editUser(req, res) {
    User.findOneAndUpdate({
        _id: req.body.id
    }, {
        $set: {
            name: req.body.name,
            email: req.body.email
        }
    }, {
        new: true
    }, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    })
}

function deleteUser(req, res) {
    User.findOneAndRemove({
        _id: req.params.id
    }, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    })
}

function login(req, res) {
    // res.redirect('/')

}

// function login() {
//     // res.redirect('/')
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/login',
//         failureFlash: true
//     })
// }

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
    viewEdit: viewEdit,
    editUser: editUser,
    deleteUser: deleteUser,
    login: login,
    isAuthenticate:isAuthenticate,
    isLogin: isLogin,
    logout: logout
}