const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const gUsers = require('../../db/user.json')

const addUser = ({ firstname, lastname, username, password }) => {
    const _id = uuidv4()
    if (!firstname || !lastname || !username || !password) return Promise.reject('All fields are required')
    const user = {
        _id, firstname, lastname, username, password
    }
    _addUserToDB(user);
    return Promise.resolve(user)
}

function _addUserToDB() {
<<<<<<< HEAD
    fs.writeFileSync('data/car.json', JSON.stringify(gUsers, null, 2))
}

function _getUser(username){
    const user = gUsers.find(u => u.id === username)
    return user;
=======
    fs.writeFileSync('../../db/user.json', JSON.stringify(gUsers, null, 2))
}

module.exports = {
    addUser
>>>>>>> e124aeded60f766abffec570dfc50e36b59e3a5f
}