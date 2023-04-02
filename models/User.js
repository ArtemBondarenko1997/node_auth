const {Schema, model} = require('mongoose')


const User = new Schema({
    email: {type: String, unique: true, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    age: {type: Number, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: false},
    password: {type: String, required: true}
})

module.exports = model('User', User)
