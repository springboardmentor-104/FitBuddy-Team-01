const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoutes");
const exerciseRoute = require("./routes/exercisesRoute");
var cors = require("cors");
dotenv.config();
// // This should already be declared in your API file
// var app = express();

// // ADD THIS
// var cors = require('cors');
// app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// // connection
connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// routes
app.use("/api/v1/auth", authRoute);

app.use("/api/exercises", exerciseRoute);

app.get("/", (req, res) => {
  res.send("<h1>hello everyone</h1>");
});

// ******* TO UPLOAD STATIC DATA IN DB ***********//
// COMMNET OUT FOLLOWING SCRIPT

// const Exercises = require('./modles/exerciseModel'); // Assuming you have a model defined for exercises
// const exercisesData = [
//     {
//         "name": "Concentration Curl",
//         "category": "strength",
//         "muscle": "biceps",
//         "equipment": "dumbbell",
//         "difficulty": "intermediate",
//         "description": " In this exercise, you sit on a bench with your elbow resting against your inner thigh, isolating the biceps for maximum contraction and muscle engagement.",
//         "photo":"https://res.cloudinary.com/du2wj5g21/image/upload/v1714047574/maxresdefault_mxvrcg.jpg"
//     },
//     {
//         "name": "Barbell Curl",
//         "category": "strength",
//         "muscle": "biceps",
//         "equipment": "barbell",
//         "difficulty": "intermediate",
//         "description": "The Barbell Curl is a fundamental biceps exercise performed by standing with a shoulder-width grip on a barbell, curling it upwards toward the chest while keeping elbows stationary, targeting the biceps for strength and size development.",
//         "photo":"https://res.cloudinary.com/du2wj5g21/image/upload/v1714047415/th_zvdagr.jpg"
//     },
//     {
//         "name": "Muscle Up",
//         "category": "strength",
//         "muscle": "lats",
//         "equipment": "body_only",
//         "difficulty": "intermediate",
//         "description": "The muscle-up is an advanced bodyweight exercise where you pull yourself up from a hanging position, transitioning smoothly to a dip position above the bar.",
//         "photo": "https://res.cloudinary.com/du2wj5g21/image/upload/v1714047879/th_4_hkdmnu.jpg"
//     },
//     {
//         "name": "Pullups",
//         "category": "strength",
//         "muscle": "lats",
//         "equipment": "body_only",
//         "difficulty": "intermediate",
//         "description": "Pull-ups are a challenging bodyweight exercise where you hang from a bar and pull yourself upward until your chin clears the bar, effectively targeting back muscles.",
//         "photo":"https://res.cloudinary.com/du2wj5g21/image/upload/v1714047481/th_2_bn1czr.jpg"
//     },
//     {
//         "name": "Dumbbell floor press",
//         "category": "powerlifting",
//         "muscle": "triceps",
//         "equipment": "dumbbell",
//         "difficulty": "intermediate",
//         "description": "The dumbbell floor press targets the chest, shoulders, and triceps by pressing dumbbells upward from a lying position on the floor.",
//         "photo": "https://res.cloudinary.com/du2wj5g21/image/upload/v1714047457/th_3_k0lwda.jpg"
//     },{
//         "name":"Surya Namaskaras",
//         "category":"yoga",
//         "muscle": "full_body",
//         "equipment": "body_only",
//         "difficulty": "intermediate",
//         "description":"Surya Namaskar is a complete body workout that boosts flexibility, strength, and stamina. This yoga sequence involves a series of postures and breathing exercises. It stretches your muscles, making you more flexible, while also building your physical strength. Plus, it enhances your endurance over time. Regular practice of Surya Namaskar is a fantastic way to keep your body in good shape and improve your overall fitness.",
//         "photo":"https://shwetyoga.in/wp-content/uploads/2020/10/Yoga-classes-in-thane-west-3.png",
//     },
//     {
//         "name":"Padha hasthasana",
//         "category":"yoga",
//         "muscle": "hamstrings,calves,gluteus",
//         "equipment": "body_only",
//         "difficulty": "intermediate",
//         "description":"By bending forward and reaching towards your toes, this yoga pose stretches the muscles in your back, hamstrings, and calves, increasing their flexibility.",
//         "photo":"https://res.cloudinary.com/dktokigva/image/upload/v1714048737/Padahastasana_zeazhs.jpg",
//     },

//     {
//         "name":"Camel Pose",
//         "category":"yoga",
//         "muscle": "abdomen,chest,shoulders,hips,thighs",
//         "equipment": "body_only",
//         "difficulty": "easy",
//         "description":"The camel pose stretches the abdominal region and improves digestion. It also relieves lower back pain, improves posture and helps in reducing fat in thighs. While performing this asana, one needs to kneel down. Then lean backwards, bend your head and spine and try touching the feet.",
//         "photo":"https://res.cloudinary.com/dktokigva/image/upload/v1714049053/Yoga-Camel-Pose_pw4npb.jpg",
//     },
//     {
//         "name":"Bridge Pose",
//         "category":"yoga",
//         "equipment": "body_only",
//         "muscle": "back muscles, glutes, and hamstrings",
//         "difficulty": "intermediate",
//         "description":"The Bridge pose improves muscle tone, digestion regulates hormones and improves thyroid levels. It also strengthens your back muscles and reduces back pain.",
//         "photo":"https://res.cloudinary.com/dktokigva/image/upload/v1714049198/Setu-Bandha-Sarvangasana-Bridge-Pose_fjntec.jpg",
//     },
//     {
//         "name":"Trikonasana-Triangle pose",
//         "category":"yoga",
//         "muscle": "knee,ankle,thigh",
//         "equipment": "body_only",
//         "difficulty": "intermediate",
//         "description":"The trikonasana helps to improve digestion as well as reduce the fat deposited in the belly & waist. It stimulates and improves blood circulation in the entire body. The lateral motion of this asana helps you burn more fat from the waist and build more muscles in the thighs and hamstrings. It also improves balance & concentration.",
//         "photo":"https://res.cloudinary.com/dktokigva/image/upload/v1714049371/Trikonasana_nringv.jpg",
//     }
// ]
// async function seedDatabase() {
//     try {
//         await connectDB(); // Assuming connectDB() function is defined and returns a promise
//         console.log('Connected to MongoDB');
//         await Exercises.insertMany(exercisesData);
//         console.log('Data inserted successfully');
//         // Close the connection
//         mongoose.connection.close();
//     } catch (error) {
//         console.error('Error:', error.message);
//         // Close the connection
//         mongoose.connection.close();
//     }
// }
// seedDatabase();

// http.listen(8080, () => {
//     console.log("Server is running on port 8080".bgCyan.white);
// });
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running on port ${port}`.bgCyan.white);
});
