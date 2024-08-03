const{signup_admin,login_admin} =require("../controllers/userController")

const express = require("express");
const router = express.Router();
router.post("/adminSignup",signup_admin);
router.post("/adminLogin",login_admin);
module.exports=router;