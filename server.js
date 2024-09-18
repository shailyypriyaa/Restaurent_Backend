const express = require("express");
// rest object
const app = express();

const connectDb = require("./config/db")

const colors = require("colors")   // give colors to your console messages

const cors = require("cors")  // middleware

const morgan = require("morgan") // middleware

const dotenv = require('dotenv');
// dotenv configuration
dotenv.config();


// DB connection
connectDb();


// cors are middleware
app.use(cors());

app.use(express.json());   //client se jo data aaye use json format me badalna
app.use(morgan("dev")); // tell us the route hit and time


// calling routes
const testRoute = require('./routes/testRoutes');
const authRoute = require('./routes/authRoutes')
const userRoute = require('./routes/userRoutes')
const restaurentRoute = require('./routes/restaurentRoutes')
const categoryRoute = require('./routes/categoryRoutes')
const foodRoutes = require('./routes/foodRoutes')

app.use('/api/test' , testRoute);
app.use('/api/auth',authRoute);
app.use('/api/user', userRoute);
app.use("/api/restaurent",restaurentRoute)
app.use("/api/category",categoryRoute)
app.use("/api/food",foodRoutes)




// route
app.get("/", (req, res) => {
  return res.status(200).send("<h1> Gawar ho kya be </h1>")
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT} ` .bgMagenta.bgBlack);
});

