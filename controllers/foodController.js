// CREATE  FOOD
const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModels");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurent,
      rating,
    } = req.body;

    if (!title || !description || !price || !restaurent) {
      return res.status(500).send({
        success: false,
        message: "Enter Complete Details",
      });
    }

    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurent,
      rating,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Food Create Api",
    });
  }
};

// GET ALL FOOD
const getFoodController = async (req, res) => {
  try {
    const food = await foodModel.find({});
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Item Found",
      });
    }

    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Food Api",
    });
  }
};

//  GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
  try {
    const foodid = req.params.id;
    if (!foodid) {
      return res.status(404).send({
        success: false,
        message: "Enter Correct FoodId",
      });
    }

    const food = await foodModel.findById(foodid);

    if (!food) {
      return res.status(500).send({
        success: false,
        message: "Enter correct ID",
      });
    }

    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Single Food Api",
    });
  }
};

//  /  GET SINGLE FOOD by Restaurent
const getByRestaurent = async (req, res) => {
  try {
    const restaurentid = req.params.id;
    if (!restaurentid) {
      return res.status(404).send({
        success: false,
        message: "Enter Correct FoodId",
      });
    }

    const food = await foodModel.find({ restaurent: restaurentid });
    // yaha pe ye restaurent collection/models me jake is id ke restaurent ke pass ke sare food le aayega
    //  or food banate vkt hamne mention kardiya tha ki konse restaurent me ban rha hai vo food

    if (!food) {
      return res.status(500).send({
        success: false,
        message: "Enter correct ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "food based on restaurent",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get  Food Api by Restaurent",
    });
  }
};

// UPDATE FOOD
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        succes: false,
        message: "No Food Id was foud ",
      });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        succes: false,
        message: "No Food  was foud , wrong id ",
      });
    }

    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurent,
      rating,
    } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        restaurent,
        rating,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Food item Was Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update  Food Api",
    });
  }
};

// DELETE FOOD
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        succes: false,
        message: "No Food Id was foud ",
      });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        succes: false,
        message: "No Food  was foud , wrong id ",
      });
    }

    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food was Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Food Api",
    });
  }
};

// PLACE ORDER
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please Add Food Caart or Paymemnt Method",
      });
    }
    // CALCULATE PRICE
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      food: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();

    res.status(201).send({
      success: true,
      message: "Order Placed Succesfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Place Order Api",
      error,
    });
  }
};

// ORDER STATUS
const orderStatusController = async (req, res) => {
  try {
    const orderid = req.params.id;
    if (!orderid) {
      return res.status(404).send({
        succes: false,
        message: "No Order Id was foud ",
      });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(404).send({
        succes: false,
        message: "No Status  was foud ",
      });
    }
    const order = await orderModel.findByIdAndUpdate(
      orderid,
      { status },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Order Status Api",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getFoodController,
  getSingleFoodController,
  updateFoodController,
  getByRestaurent,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
