const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/signup", async (req, res) => {

  try {
    const existing_user = await User.findOne({ email: req.body.email });

    if (existing_user){
      res.status(200).json({error: "user already exists"});       // if user with same email exists already, don't allow signup
      return
    }
  } catch (error) {
    res.status(500).json(error)
    return
  }

  try {
    //generate new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      conversations: []
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
    return
  } catch (err) {
    console.log("works")
    res.status(500).json(err)
    return
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user){
      res.status(200).json({error: "user not found"});
      return
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword){
      res.status(200).json({error: "wrong password"})
      return
    }

    res.status(200).json(user)
    return

  } catch (err) {
    res.status(500).json(err)
    return
  }
});

module.exports = router;