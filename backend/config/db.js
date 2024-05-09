const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONOG_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4,
    });
    console.log(
      `mongo database is connected!!! ${con.connection.host}  `.bgGreen.white
    );
  } catch (error) {
    console.log(`error in mongo ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
