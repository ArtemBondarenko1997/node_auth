const {Schema, model} = require('mongoose')


const User = new Schema({
    email: {type: String, unique: true, required: true},
    first_name: {type: String, required: false},
    last_name: {type: String, required: false},
    age: {type: Number, required: false},
    phone: {type: String, required: false},
    address: {type: String, required: false},
    password: {type: String, required: true}
})

module.exports = model('User', User)
