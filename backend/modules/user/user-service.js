const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const gUsers = require('../../db/user.json')
const jwt = require("jsonwebtoken");


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

function _getUser(username) {
    const user = gUsers.find(u => u.id === username)
    if (user) {
        return Promise.resolve(user);
    }
    else {
        return Promise.reject("User doesn't exists")

    }
}

async function signin(username, password) {
    return new Promise((resolve, reject) => {
        _getUser(username).then(result => {
            bcrypt.compare(password, result.password, (err, res) => {
                if (res) {
                    const token = jwt.sign(
                        {
                            usernamr: result.username,
                            userId: result._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    resolve({
                        message: "Auth successful",
                        token: token
                    })
                }
                if (err) {
                    reject({
                        message: "Auth failed"
                    })
                }

                reject({ message: "Auth failed" })

            })

        })
    

        module.exports = {
            addUser,
            getUser
        }