const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Creating user using : POST "/api/auth/createuser"
router.post('/createuser',[
    body('name', 'Name is required').not().isEmpty(),
    body('username', 'Please enter unique username').not().isEmpty(),
    body('password', 'Please enter a password with 3 or more characters').isLength({ min: 3 }),
], async (req, res) => {

    // If errors exists, then this code is executed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check whether the user with same username exists?
      try {
        let user = await Users.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'Username already exists' }]
                })
            }
        // Creating a user
        user = await Users.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        })
        res.json(user)
      }
      catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})

module.exports = router