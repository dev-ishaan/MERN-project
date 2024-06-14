const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Creating user using : POST "/api/auth"
router.post('/',[
    body('name', 'Name is required').not().isEmpty(),
    body('username', 'Please enter unique username').not().isEmpty(),
    body('password', 'Please enter a password with 3 or more characters').isLength({ min: 3 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    Users.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
      }).then(user => res.json(user));
})

module.exports = router