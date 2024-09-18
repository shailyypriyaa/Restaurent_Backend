const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // get token
    const token = req.headers["authorization"].split(" ")[1];
    
    if(!token){
      return res.status(500).send({
        success:false,
        message:"You Have Not Passed Token"
      })
    }

    
    // yaha token verify hogya
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ 
            success: false, 
            message: "Un Aurthorize User"
         });
      }


    //   agar error nhi aayi to token ki decode value "decode" me milegi
    // token ke creation me hum iod bhej rhe to decode me bhi id milegi


// decode aapne sath 
//     {
//          "id": "664d769aa3301a9ae68c39c0",
//          "iat": 1716354202,
//          "exp": 1716959002
//      }
// ye sab la rha hai usme se hame sirf "id" chaiye

else{
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Occured at JWT Middleware",
    });
  }
};



