const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECERT = "ravinderinotebook";
const fetchuser = require('../middleware/fetchuser');
//Create a User using: Post "/api/auth/createuser". No Login require
router.post('/createuser',[
    body('name','Enter Valid name').notEmpty(),
    body('name','Name Length should be greater than 3 letter').isLength({ min: 3 }),
    body('email','Enter Valid email').isEmail(),
    body('password','password Length should be greater than 6 letter').isLength({ min: 6 })
  ], async (req, res) => {
    // const user = User(req.body);
    // user.save()
    // If there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    // Check whether the user with email exits already
    try {    
        let user = await User.findOne({email:req.body.email});
        if(user) {
            return res.status(400).json({ errors: " User already exists with this email address" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass, 
        })
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECERT);
        //console.log(jwdData);
        res.json({authToken});
    } catch (error) {
      console.error(error.message); 
      res.status(500).send("some error occur")     
    }     
})

//Authenticate using: Post "/api/auth/login".
router.post('/login',[
    body('email','Enter Valid email').isEmail(),
    body('password','password Can not be blank').trim().notEmpty(),
  ], async (req, res) => {

    // If there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email}); 
        if(!user){
            return res.status(400).json({ errors: "Please try to login with correct credentials"});
        }

        const passwordcompare = await bcrypt.compare(password,user.password);
        if(!passwordcompare){
            return res.status(400).json({ errors: "Please try to login with correct credentials"});
        }   
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECERT);
        res.json({authToken});             
    } catch (error) {
        console.error(error.message); 
        res.status(500).send("Internal server error");    
    }
})

//Authenticate using: Post "/api/auth/getuser".
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        console.log("test test");
        const user = await User.findById(userId).select("-password");
        res.send(user); 
    } catch (error) {
        console.error(error.message); 
        res.status(500).send("some error occur");     
    }
})
module.exports = router