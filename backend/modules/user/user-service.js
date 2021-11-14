const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const gUsers = require('../../db/user.json')
const jwt = require("jsonwebtoken");
var path = require('path');


const addUser = ({ company, email, username, firstName, lastName, city, country, password, postalCode, aboutMe }) => {
    const _id = uuidv4()
    return new Promise((resolve, reject) => {
        if (!firstName || !lastName || !username || !password) return reject('All fields are required')
        const user = gUsers.find(u => u.username === username)
        if (user) return reject('Username is in use')
        bcrypt.hash(password, 10, ((err, hash) => {
            if (err) return reject(err)
            const user = {
                _id, firstName, lastName, username, password: hash, company, email, city, country, postalCode, aboutMe
            }
            gUsers.unshift(user)
            _addUserToDB()
            return resolve(auth(username, password))
        }));
    })
}

function _addUserToDB() {
    fs.writeFileSync(path.join(__dirname + '../../../db/user.json'), JSON.stringify(gUsers, null, 2))
}

function _getUser(username) {
    const user = gUsers.find(u => u.username === username)
    if (user) {
        return Promise.resolve(user);
    }
    else {
        return Promise.reject("User doesn't exists")

    }
}

async function auth(username, password) {
    return new Promise((resolve, reject) => {
        _getUser(username).then(result => {
            bcrypt.compare(password, result.password, (err, res) => {
                if (res) {
                    const token = jwt.sign(
                        {
                            username: result.username,
                            userId: result._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    resolve({
                        message: "Auth successful",
                        token
                    })
                }
                if (err) {
                    reject({
                        message: "Auth failed"
                    })
                }
                reject({ message: "Auth failed" })
            })
        }).catch(err => reject({message: err}))
    })
}




module.exports = {
    addUser,
    auth
}