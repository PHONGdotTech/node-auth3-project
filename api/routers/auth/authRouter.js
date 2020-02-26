const express = require("express")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../users/usersModel')
const secrets = require('../../../config/secrets')


const router = express.Router();

router.post('/register', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 8)
    req.body.password = hash

    Users.register(req.body)
    .then(id => {
        res.status(201).json({
            message:"Successfully created a new user.",
            new_user: {
                id: id[0],
                username: req.body.username
            }
        })
    })
    .catch(({name, code, message, stack}) => {
        res.status(500).json({name, code, message, stack})
    })
})

router.post('/login', (req, res) => {
    Users.findBy({username: req.body.username})
    .then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password)){
            const token = generateToken(user)
            res.status(200).json({
                message:`Welcome back, ${user.username}!`,
                token
            })
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    })
    .catch(({name, code, message, stack}) => {
        console.log('err')
        res.status(500).json({name, code, message, stack})
    })
})

module.exports = router;

function generateToken(user){
    const payload = {
        subject: user.username,
        dept: user.department
    }

    options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secrets.JWT_SECRET, options)
}