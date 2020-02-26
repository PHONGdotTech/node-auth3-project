const express = require('express')
const Users = require('./usersModel')

const router = express.Router()

router.get('/', (req,res) => {
    Users.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(({name, code, message, stack}) => {
        res.status(500).json({name, code, message, stack})
    })
})

module.exports = router;