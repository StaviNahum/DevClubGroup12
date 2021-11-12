const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const gUsers = require('../../db/user.json')

const addUser = ({ firstname, lastname, username, password }) => {
    const _id = uuidv4()
    if (!firstname || !lastname || !username || !password) return Promise.reject('All fields are required')
    bcrypt.hash(password, 10, ((err, hash) => {
        if (err) return Promise.reject(err)
        const user = {
            _id, firstname, lastname, username, hash
        }
        _addUserToDB(user);
        return Promise.resolve(user)
    }));
}

function _addUserToDB() {
    fs.writeFileSync('../../db/user.json', JSON.stringify(gUsers, null, 2))
}

module.exports = {
    addUser
}