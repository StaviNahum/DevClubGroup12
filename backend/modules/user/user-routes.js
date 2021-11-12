const express = require('express');
const { signin, signup, signout } = require('./user-controller');

const router = express.Router();

router.post("/sign-in", signin);
router.post("/signup", signup);
router.post("/sign-out", signout);
module.exports = router
