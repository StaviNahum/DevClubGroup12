const jwt = require("jsonwebtoken");

const { addUser, auth, getProfile } = require("./user-service");

async function requireAuth(req, res, next) {
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

async function edit(req, res, next){
    try {
        console.log(req.body)
        const {user} = req
        const {properties} = req.body
        const mess = await editUser(user, properties)
        
    } catch (error) {
        res.status(404).send("Couldn't edit user")
    }
}

async function profile(req, res){
    try{
        console.log(req.body);
        const {user} = req
        const userProfile = await getProfile(user)
        res.send(userProfile)
    }

    catch(err)
    {
        res.status(404).send("User not found")
    }
}



module.exports = {
    signin,
    signup,
    signout,
    requireAuth,
    profile,
    edit
}