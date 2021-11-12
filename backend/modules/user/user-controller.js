const { addUser } = require("./user-service");

gUsers = [];

async function signin(req, res) {

}

async function signup(req, res) {
    try {
        console.log(req.body);
        const user = await addUser(req.body)
        res.send(user)
    }
    catch (err) {
        res.status(500).send(err)
    }
}


async function signout(req, res) {


}

module.exports = {
    signin,
    signup,
    signout
}

