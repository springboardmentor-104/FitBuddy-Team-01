const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONOG_URL);
    console.log(
      `mongo database is connected!!! ${con.connection.host}  `.bgGreen.white
    );
  } catch (error) {
    console.log(`error in mongo ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
