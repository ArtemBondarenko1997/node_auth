const User = require('./models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("./config")

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors})
            }
            const {email, password, ...params} = req.body;
            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({message: "A user with the same name already exists"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({...params, email, password: hashPassword})
            await user.save()
            return res.json({message: "User successfully registered"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: `User ${email} not found`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Wrong password entered`})
            }
            const token = generateAccessToken(user._id)
            console.log(token)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUser(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const {id: _id} = jwt.verify(token, secret)
            const user = await User.findOne({ _id })
            const {address, age, email, first_name, last_name, phone} = user;
            res.json({address, age, email, first_name, last_name, phone})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'User with this id not find'})
        }
    }
}

module.exports = new authController()
