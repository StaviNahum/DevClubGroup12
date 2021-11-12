async function signin(req, res) {
}

async function signup(req, res) {
    const { v4: uuidv4 } = require('uuid');
    console.log(uuidv4());
// asdasd
}

async function signout(req, res) {

}

module.exports = {
    signin,
    signup,
    signout
}

