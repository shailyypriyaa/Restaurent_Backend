//  Restaurent

const restaurentmodel = require('../models/restaurentmodel')

// Create Restaurent data
const createRestaurentController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    // Check Validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Incomplete Entries of either Title or Coordninates",
      });
    }

    const newRestaurent = await restaurentmodel.create({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    // await newRestaurent.save();

    res.status(201).send({
      success: true,
      message: "Entry Added Succesfully",
      newRestaurent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      messgae: "Error in Creating Restaurent",
    });
  }
};

// GET ALL RESTAURENT
const getAllRestaurentController = async (req, res) => {
  try {
    const restaurents = await restaurentmodel.find({});

    if (!restaurents) {
      return res.status(404).send({
        success: false,
        message: "No Restaurent Currently Available",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: restaurents.length,
      restaurents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error with GetRestaurent Api",
    });
  }
};

// GET RESTAURENT BY ID
const getRestaurentById = async (req, res) => {
  try {
    const restaurentId = req.params.id;

    if (!restaurentId) {
      return res.status(404).send({
        success: false,
        message: "Enter restaurent ID",
      });
    }
    // find Restaurent
    const restaurent = await restaurentmodel.findById(restaurentId);
    if (!restaurent) {
      return res.status(404).send({
        success: false,
        message: "No Restaurent Found",
      });
    }

    res.status(200).send({
      success: true,
      restaurent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in GetRestaurent Api by id",
    });
  }
};



// DELETE RESTAURENT
const deleteRestaurentController = async(req,res)=>{
try {
  const restaurentId = req.params.id
  if(!restaurentId){
    return res.status(500).send({
      success: false,
      message: "Enter Restaurent ID",
    });
  }

  await restaurentmodel.findByIdAndDelete(restaurentId);
  res.status(200).send({
    success:true,
    message:"Restaurent Deleted Succesfully"
  })

} catch (error) {
  console.log(error);
  return res.status(500).send({
    success:false,
    message:"ERROR in DELETING RESTAURENT API"
  })
}
}


module.exports = {
  createRestaurentController,
  getAllRestaurentController,
  getRestaurentById,
  deleteRestaurentController,
};



