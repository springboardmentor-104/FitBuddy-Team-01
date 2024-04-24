const userModel = require('../modles/userModel');
const Exercise = require('../modles/exerciseModel'); // Singular 'Exercise' instead of 'exercises'


// create exercise
const createExerciseController = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        const photo = req.file ? req.file.filename : null; // Assuming 'photo' is the field name in your form
        if (!name || !description || !category) {
            return res.send({ success: false, message: "all fields is required" });
        }
        if (!photo) {
            return res.send({ success: false, message: "Image is required" });
        }

        const exercise = new Exercise({ // Changed 'exercises' to 'Exercise'
            name,
            description,
            category,
            photo
        });
        console.log(exercise)
        const savedExercise = await exercise.save();
        return res.status(201).send({ success: true, message: "exercise is created", savedExercise });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// show all exercise
const getAllExercisesController = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        if (!exercises) {
            return res.send({success:false, message: 'Exercise not found' });
        }
        return res.send({success:true ,exercises});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// show exercise id wise
const getExerciseByIdController = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.send({success:false, message: 'Exercise not found' });
        }
        return res.send({success:true,exercise});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {createExerciseController, getAllExercisesController,getExerciseByIdController};