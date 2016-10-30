var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    createdAt: Date,
    updatedAt: Date
})

userSchema.plugin(passportLocalMongoose)

var User = mongoose.model('users', userSchema)

module.exports = User
