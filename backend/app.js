const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoutes");
var cors = require("cors");
dotenv.config();

// connection
connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// routes
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
  res.send("<h1>hello everyone</h1>");
});

// http.listen(8080, () => {
//     console.log("Server is running on port 8080".bgCyan.white);
// });
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running on port ${port}`.bgCyan.white);
});
