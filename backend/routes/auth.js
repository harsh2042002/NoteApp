const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser')

const JWT_SEC = "alagidsehiaana";
//ROUTE 1: create a user  using : Post "/api/auth/createuser" , no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid name").isLength({ min: 1 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 character").isLength({min: 8,}),
  ],
  async (req, res) => {
    let success = false;

    //if there are any errors than it will show to the user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whetherthe email and user already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const sacPass = await bcrypt.hash(req.body.password, salt);

      //creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: sacPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SEC);
      success=true
      res.json({ success,authtoken });

      //catching errors
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//ROUTE 2:Authenticate a user : post "api/auth/login" . no login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be requred").exists(),
  ],
  async (req, res) => {
    let success = false;

    //if there are any errors than it will show to the user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try{
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error : "Please Enter correct email"});
      }
      const passwordCompare = await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({success,error : "Please Enter correct PassWord"})
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SEC);
      success=true;
      res.json({ success,authtoken });

    } catch(error){
      console.error(error.message);
      res.status(500).send("Internal server errors");
    }
  });

//ROUTE 3: get loggedin user details using: Post:"/api/auth/getuser", Login required
router.post("/getuser",fetchuser,async (req, res) => {
    try{
     const  userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    }
    catch (error){
      console.error(error.message);
      res.status(400).send("internal error in login");

    }
  });




module.exports = router;
