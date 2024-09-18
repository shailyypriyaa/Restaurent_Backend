const mongoose = require("mongoose");
const colors = require("colors");

// function mongoDb connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex:true,
    });
    // async isilie banaya kyuki niche console.log ka code hai agar ...
    // agar async nhi dale to connection me time lagega to vo niche vala 
    // consolelog bina connection success hue bhi print kar dega
    console.log(`Connected to DB  ${mongoose.connection.host} `.bgGreen);
  } catch (error) {
    console.log("DB error", error.bgRed);
  }
};

module.exports = connectDb
