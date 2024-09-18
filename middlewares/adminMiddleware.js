const usermodel = require("../models/usermodel");


module.exports = async (req, res, next) => {
  try {
    const user= await usermodel.findById(req.body.id)
    if(user.usertype !== 'admin'){
        return res.status(500).send({
            success:false,
            message:"Only Admin Can Access"
        })
    }
    else{
        next();
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "UnAuthorized Access",
      error
    });
  }
};


//  Abb jaha jaha admin ka role ho us us route me is middleware ko daldo
