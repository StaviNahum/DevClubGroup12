const express = require('express');
const { signin, signup, signout } = require('./user-controller');

const router = express.Router();

router.post("/sign-in", signin);
router.post("/sign-up", signup);
router.post("/sign-out", signout);
// sdfdsf
module.exports = router
