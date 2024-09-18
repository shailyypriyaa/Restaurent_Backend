// CREATE CAT

const categoryModel = require("../models/categorymodel");

// CREATE CAT
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //valdn
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "please provide category title or image",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Cat API",
      error,
    });
  }
};

// GET ALL CATEGORY
const getAllCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "No Categories Found",
      });
    }

    res.status(200).send({
      succes: true,
      totalCategory: category.length,
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error with Get All Category Api",
    });
  }
};

// UPDATE CAT
const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );

    /* 
    When using MongoDB's findByIdAndUpdate method (or similar update methods like findOneAndUpdate), you have the option to specify certain settings through the options object. One of these settings is new.

    new: false (default behavior): The method returns the document as it was before the update was applied.
    
    new: true: The method returns the document after the update has been applied.
    */

    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No Category Updated",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully Updated Category",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update Cat Api",
    });
  }
};


// DELETE CATEGORY

const deleteCatController = async(req,res)=>{
    try {
        const deleteId = req.params.id

        if(!deleteId){
            return res.status(404).send({
                success:false,
                message:"Please provide ID"
            })
        }

        const category = await categoryModel.findByIdAndDelete(deleteId);
        
        if (!category) {
          return res.status(404).send({
            success: false,
            message: "Please provide Valid ID",
          });
        }

        res.status(200).send({
            success:true,
            message:"Successfully Deleted"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error With Delete Category Api"
        })
    }
}

module.exports = {
  createCatController,
  getAllCategory,
  updateCatController,
  deleteCatController,
};
