const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoutes');
const exerciseRoute = require('./routes/exercisesRoute');
const mealRoute = require('./routes/mealRoute');
const goalRoute = require('./routes/goalRoutes');
const historyRoute = require('./routes/historyRotues')
const cors = require('cors');
var bodyParser = require('body-parser')




dotenv.config(); 

// connection
connectDB();


const app = express();

// middleware
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/exercise',exerciseRoute);
app.use('/api/v1/meal',mealRoute);
app.use('/api/v1/goal',goalRoute);
app.use('/api/v1/history',historyRoute);



app.get('/',(req,res)=>{
    res.send(
        "<h1>hello everyone</h1>"
    )
})

// ********************* TO UPLOAD STATIC DATA IN DB *******************************//
// COMMNET OUT FOLLOWING SCRIPT
// const Meal = require('./modles/dietModel'); // Assuming you have a model defined for exercises
// const mealDAta = [
//     {
//         "category":"breakfast",
//         "name":"banana pancakes",
//         "calories":"124",
//         "protein":"7g",
//         "fat":"5g",
//         "ingredients":"banana and eggs"
        
//     },
//     {
//         "category":"breakfast",
//         "name":"protein shake",
//         "calories":"110",
//         "protein":"25g",
//         "fat":"0.5g",
//         "ingredients":"protein powder,almond milk and frozen banana"
//     },
//     {
//         "category":"lunch",
//         "name":"Quinoa Veg Upma",
//         "calories":"120",
//         "protein":"4.4g",
//         "fat":"1.9g",
//         "ingredients":"quinoa,onions,green peas,carrot and spices"
//     },
//     {
//         "category":"lunch",
//         "name":"Grilled Chicken",
//         "calories":"128",
//         "protein":"26g",
//         "fat":"2.7g",
//         "ingredients":"chicken breast and spices"
//     },
//     {
//         "category":"dinner",
//         "name":"Chicken stir fry",
//         "calories":"311",
//         "protein":"19.4g",
//         "fat":"11.1g",
//         "ingredients":"chicken,spices"
//     },
//     {
//         "category":"dinner",
//         "name":"Daliya with vegetables",
//         "calories":"227",
//         "protein":"11.6g",
//         "fat":"2.5g",
//         "ingredients":"bulgur wheat,veggies and moong dal"
//     }
// ]
// async function seedDatabase() {
//     try {
//         await connectDB(); // Assuming connectDB() function is defined and returns a promise
//         console.log('Connected to MongoDB');
//         await Meal.insertMany(mealDAta);
//         console.log('Data inserted successfully');
//         // Close the connection
//         mongoose.connection.close();
//     } catch (error) {
//         console.error('Error:', error.message);
//         // Close the connection
//         mongoose.connection.close();
//     }
// }
//seedDatabase();

// ********************* TO UPLOAD STATIC DATA IN DB *******************************//


const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`.bgCyan.white);
})