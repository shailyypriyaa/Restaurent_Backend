// 
// Creating WEB TOKENS
const jwt = require('jsonwebtoken')

const createToken = (id)=>{
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
}

module.exports = createToken


// Now Verifying Web Tokens

// this verifying code is written in a MIDDLEWARE with name AUTHMIDDLEWARE





 