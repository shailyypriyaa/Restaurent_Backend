const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");

// Get User Info GET
const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    // Hide password;
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User Data FOund",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};

//  UPDATE  USER
const updateUserController = async (req, res) => {
  try {
    const user = await usermodel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "USerNot Found",
      });
    }

    // update
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    // save user
    await user.save();

    res.status(200).send({
      success: true,
      message: "User Updated Succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "Error Occured",
      error,
    });
  }
};

// UPDATE PASSWORD                                                                     UPDATE password

const updateUserPassword = async (req, res) => {
  try {
    // finduser
    const user = await usermodel.findById({ _id: req.body.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });

      //   get data from user
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Incomplete Field",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in password Update",
    });
  }
};



// RESET password
const resetPasswordController = async(req,res)=>{

    try {
        const {email,newPassword,answer} = req.body
        if(!email || !newPassword || !answer){
            return res.status(200).send({
                success:false,
                message : "Incomplete Data"
            })
        }

        const user = await usermodel.findOne({email,answer})
        // we are finding user with that email and answer

        if(!user){
            return res.status(200).send({
                success:false,
                message:"No User Found or Invalid Answer"
            })
        }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);    
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success:true,
            message:"Password was Succesfully Reset"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Reset Api"
        })
    }

}


// DELETE PROFILE
const deleteProfileController = async(req,res)=>{
    try {
        await usermodel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Your Account has been deleted Succesfully"
        })
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Delete User Api"
        })
    }
}

module.exports = {
  getUserController,
  updateUserController,
  updateUserPassword,
  resetPasswordController,
  deleteProfileController,
};
