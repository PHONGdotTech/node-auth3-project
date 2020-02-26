const express = require('express')

const authRouter = require('./auth/authRouter')
const usersRouter = require('./users/usersRouter')

const restricted = require('./auth/restricted_middleware')

const router = express.Router();

router.use('/auth', authRouter)
router.use('/users', restricted, checkDept('hr'), usersRouter)

module.exports = router;

function checkDept(dept){
    return (req,res,next)=>{
        if (req.decodedToken && req.decodedToken.dept && req.decodedToken.dept.toLowerCase() === dept){
            next()
        } else {
            res.status(403).json({error:"You are not authorized."})
        }
    }
}