const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const gUsers = require('../../db/user.json')
const jwt = require("jsonwebtoken");
var path = require('path');


const addUser = ({ firstname, lastname, username, password }) => {
    const _id = uuidv4()
    return new Promise((resolve, reject) => {
        if (!firstname || !lastname || !username || !password) return reject('All fields are required')
        const user = gUsers.find(u => u.username === username)
        if (user) return reject('Username is in use')
        bcrypt.hash(password, 10, ((err, hash) => {
            if (err) return reject(err)
            const user = {
                _id, firstname, lastname, username, password: hash
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

async function requireAuth({ firstname, lastname, username, password,  }) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.user = decode;
        next()
    }
    catch (err) {
        //go to error handler
        next({ status: 401, message: "Auth failed!" })
    }
}


module.exports = verifyToken;
async function editUser(req, res, next) {
    try {
        username,password,
    }
    catch (err) {

    }
}


async function auth(username, password) {
    return new Promise((resolve, reject) => {
        _getUser(username).then(result => {
            bcrypt.compare(password, result.password, (err, res) => {
                if (res) {
                    const token = jwt.sign(
                        {
                            userId: result._id,
                            username: result.username
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
                        message: "Wrong password!"
                    })
                }
                reject({ message: "Auth failed" })
            })

        })
    })
}




module.exports = {
    addUser,
    auth,
    editUser
}