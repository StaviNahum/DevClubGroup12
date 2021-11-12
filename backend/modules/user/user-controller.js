const { addUser } = require("./user-service");

gUsers = [];

async function signin(req, res) {
    try {
        console.log(req.body);
        const mess = await signin(req.body.username, req.body.password)

        res.status(201).send(mess)

    }
    catch (err) {
        res.status(500).send(err)
    }
}

async function signup(req, res) {
    const { v4: uuidv4 } = require('uuid');
    console.log(uuidv4());
}

async function signout(req, res)
{    
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

module.exports ={
    signin,
    signup,
    signout
}

