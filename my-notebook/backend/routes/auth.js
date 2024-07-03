const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWTSecretKey = 'secretOrPrivateKey';

// ROUTE 1: Creating user using : POST "/api/auth/createuser"
router.post('/createuser',[
    body('name', 'Name is required').not().isEmpty(),
    body('username', 'Please enter unique username').not().isEmpty(),
    body('password', 'Please enter a password with 3 or more characters').isLength({ min: 3 }),
  ], async (req, res) => {

      let success = false
      // If errors exists, then this code is executed
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ success, errors: errors.array() });
        }

        // Check whether the user with same username exists?
        try {
          let user = await Users.findOne({ username: req.body.username });
          if (user) {
              return res.status(400).json({success, errors: [{ msg: 'Username already exists' }]
                  })
              }

          const salt = await bcrypt.genSalt(10)
          const secretPass = await bcrypt.hash(req.body.password, salt)

          // Creating a user in db
          user = await Users.create({
              name: req.body.name,
              username: req.body.username,
              password: secretPass
          })

          // Using id of user to sign it into auth token
          const data = {
            user : {
              id: user.id
            }
          }
          // Adding JWTSecretKey to make it more secure
          const authToken = jwt.sign(data, JWTSecretKey)

          success= true
          // res.json(user)
          res.json({success, authToken})
        }
        catch(error){
          console.error(error.message);
          res.status(500).send("Internal Server Error");
        }
})

// ROUTE 2: Authenticate user using: POST "/api/auth/login"
router.post('/login', [
  body('username', 'Username is required').not().isEmpty(),
  body('password', 'Password is required').not().isEmpty()
  ], async (req, res) => {
    
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      }

      const {username, password} = req.body

      try {
        let user = await Users.findOne({username})
        if(!user) {
          return res.status(400).json({success, error: "Please try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
          return res.status(400).json({success, error: "Please try to login with correct credentials"})
          }

          // Using id of user to sign it into auth token
          const data = {
            user : {
              id: user.id
            }
          }
          // Adding JWTSecretKey to make it more secure
          const authToken = jwt.sign(data, JWTSecretKey)

          success = true
          // res.json(user)
          res.json({success, authToken})

      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})

// ROUTE 3: Get logged in user details using: POST "/api/auth/getuser" . Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
      let userId = req.user.id
      const user = await Users.findById(userId).select("-password") // fetch all details except password
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})

module.exports = router