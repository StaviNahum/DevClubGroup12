const { addUser } = require("./user-service");

gUsers = [];

async function signin(req, res) {

}

async function signup(req, res) {
<<<<<<< HEAD
    const { v4: uuidv4 } = require('uuid');
    console.log(uuidv4());
}

async function signout(req, res)
{
    
=======
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


>>>>>>> e124aeded60f766abffec570dfc50e36b59e3a5f
}

module.exports ={
    signin,
    signup,
    signout
}

