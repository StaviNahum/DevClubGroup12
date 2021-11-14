const { addUser, auth } = require("./user-service");


async function signin(req, res) {
    try {
        const mess = await auth(req.body.username, req.body.password)
        res.status(201).send(mess)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function signup(req, res) {
    try {
        const user = await addUser(req.body)
        res.status(201).json(user)
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

async function signout(req, res) {
    try {
        console.log(req.body);
        const mess = await auth(req.body.username)
        console.log(mess)
        res.status(201).send(mess)
    }
    catch {

    }
}



module.exports = {
    signin,
    signup,
    signout
}