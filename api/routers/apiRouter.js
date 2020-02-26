const express = require('express')

const authRouter = require('./auth/authRouter')
const usersRouter = require('./users/usersRouter')

const router = express.Router();

router.use('/auth', authRouter)
router.use('/users', usersRouter)

module.exports = router;