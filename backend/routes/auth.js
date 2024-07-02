const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a User using: Post "/api/auth/". does not require auth
router.post('/',[
    body('name','Enter Valid name').notEmpty(),
    body('name','Name Length should be greater than 3 letter').isLength({ min: 3 }),
    body('email','Enter Valid email').isEmail(),
    body('password','password Length should be greater than 6 letter').isLength({ min: 6 })
  ], (req, res) => {
    // console.log(req.body);
    // const user = User(req.body);
    // user.save()
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    //if (result.isEmpty()) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, 
          }).then(user => res.json(user))
          .catch(err=>{console.log(err)
            res.json({error:'Please enter a unique value for email',message:err.message})
          })
        //return res.send(`Hello, ${req.body.name}!`);
    //}
    //res.send({ errors: result.array() });

    
    
    //res.send(req.body)
})

module.exports = router