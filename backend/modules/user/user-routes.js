const express = require('express');
const { signin, signup, signout, requireAuth, profile } = require('./user-controller');


const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
// router.patch("/edit", edit);
router.post("/signout", signout);
router.get("/profile", requireAuth, profile);
module.exports = router

