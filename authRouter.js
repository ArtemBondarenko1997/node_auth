const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require('./middlewaree/authMiddleware')

router.post('/registration', [
    check('email', "Please enter a valid email").isEmail(),
    check('password', "Password must be more than 4 and less than 10 characters").isLength({min:4, max:10}),
    // check('age', "Age cannot be empty").notEmpty(),
    // check('first_name', "Username not specified").notEmpty(),
    // check('last_name', "User last name not specified").notEmpty(),
    // check('phone', "Invalid phone format").custom((value) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value)),
], controller.registration)
router.post('/login', controller.login)
router.get('/user', authMiddleware, controller.getUser)
router.patch('/user', authMiddleware, controller.updateUser)

module.exports = router
