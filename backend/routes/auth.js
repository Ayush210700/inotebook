const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../Middleware/fetchuser');

const JWT_SECRET = 'Ayushisagoodb$oy';

//ROUTE 1: Create a User using: POST "/api/auth/createuser". No Login Required
router.post('/createuser', [
  body('name', 'Enter a Valid Name.').isLength({ min: 3 }),
  body('email', 'Enter a Valid Email.').isEmail(),
  body('password', 'Password is too small.').isLength({ min: 5 }),
], async (req, res) => {
  // if there are errors, return bad Request.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    // check whether the user with this email exists or not.
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry, User already exists with this emailId." })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //cretaed a new User.
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);

    // This will show user in the output of the the Thunderbolt.
    // res.json(user);

    res.json({ authtoken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.")
  }
})

//ROUTE 2: Authenticating a User using: POST "/api/auth/login". No Login Required
router.post('/login', [
  body('email', 'Enter a Valid Email.').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

  // if there are errors, return bad Request.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please enter correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please enter correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.")
  }

})

//ROUTE 3: Get LoggedIn User Details using: POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.")
  }
})

module.exports = router