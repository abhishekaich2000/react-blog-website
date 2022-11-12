const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async(req, res)=>{
  try {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    const user = await newUser.save();
    const {password, ...others} = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
})

// Login
router.post("/login", async(req, res)=>{
  try {
    const user = await User.findOne({username: req.body.username});

    if(!user){
      return res.status(400).json({error:"wrong credientials !!!"});
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if(!validated){
      return res.status(400).json({error:"wrong credientials !!!"});
    }
    const {password, ...others} = user._doc;
    res.status(200).json(others);

  } catch (error) {
    res.status(500).json(error);
  }
})




module.exports = router