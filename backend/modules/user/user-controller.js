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

function errorhandler (err, req, res, next) {
    if (err.status) res.status(err.status).end(err.message)
    else
        res.status(500).end(err)
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
    profile
}