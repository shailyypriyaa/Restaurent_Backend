const usermodel = require("../models/usermodel");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const CreateToken = require('../jwt')

//  REGISTER
const registerController = async (req, res) => {
  try {
    // destructuring
    const { username, email, password, phone, address,answer } = req.body;

    // validation
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all field",
      });
    }

    // check user
    const existing = await usermodel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email already Registered",
      });
    }


    // salt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    // create user
    const user = await usermodel.create({
      username,
      email,
      password:hashedPassword,
      address,
      phone,
      answer 
    });
    res.status(200).send({
      success: true,
      message: "SuccessFully registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Occured While Registering",
      error,
    });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // VALIDATION
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "INCOMPLETE INFORMATION",
      });
    }

    // Check user
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "NOT FOUND!!!",
      });    
    }
    

    // compare password
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(500).send({
          success: false,
          message: "INVALID!!!",
        });
    }


    // creating token
    const token = CreateToken(user._id);
    

    user.password = undefined // to hide the password in output
    
    res.status(200).send({
      success: true,
      message: "LOGIN successful",
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Login Authentication Failed",
    });
  }
};

module.exports = { registerController, loginController };
