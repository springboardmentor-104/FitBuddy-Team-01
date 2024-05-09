const Diet = require("../modles/createDietGoalModel");

const createDietController = async (req, res) => {
  try {
    let { userId, dietArr } = req.body;
    let resArr = [];
    for (let dietObj in dietArr) {
      let { name, timeToEat, quantity, calories } = dietArr[dietObj];

      // Check if required fields are present
      if (!userId || !name || !timeToEat || !quantity || !calories) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      //validate Time to eat
      const validTimeToEat = ["breakfast", "lunch", "dinner"];
      if (!validTimeToEat.includes(timeToEat)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid time to eat" });
      }

      name = name.toLowerCase();

      // Create new diet instance
      const diet = new Diet({
        userId: userId,
        name: name,
        timeToEat: timeToEat,
        quantity: quantity,
        calories: calories,
      });

      // Save the diet to the database
      const savedDiet = await diet.save();
      resArr.push(savedDiet);
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: "Diet created successfully",
      diet: resArr,
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating diet:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getAllDietController = async (req, res) => {
  try {
    const diets = await Diet.find();
    if (!diets) {
      return res.send({ success: false, message: "Diet not found" });
    }
    return res.send({ success: true, diets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDietByIdController = async (req, res) => {
  try {
    const diet = await Diet.findById(req.params.id);
    if (!diet) {
      return res.send({ success: false, message: "Diet  not found" });
    }
    return res.send({ success: true, diet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDietByUserIdController = async (req, res) => {
  try {
    const { userId } = req.body;
    const diet = await Diet.find({ userId: userId });
    if (!diet) {
      return res.send({ success: false, message: "Diet not found" });
    }
    return res.send({ success: true, diet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDietController,
  getAllDietController,
  getDietByIdController,
  getDietByUserIdController,
};
