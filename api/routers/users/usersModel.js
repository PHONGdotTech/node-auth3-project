const db = require('../../../data/dbConfig')

module.exports = {
    get,
    register,
    findBy
}

function get(){
    return db('users')
}

function register(newUser){
    return db('users').insert(newUser, 'id')
}

function findBy(filter){
    return db('users').where(filter).first()
}