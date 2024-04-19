const nodemailer = require("nodemailer");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config();
module.exports = async (email, subject, text) => {
  try {
    const trasnporter = nodemailer.createTransport({
      // host:process.env.HOST,
      // port:Number(process.env.MAIL_PORT),
      // secure:Boolean(process.env.SECURE),
      // requireTLS:true,
      // auth:{
      //     user:process.env.USER,
      //     pass:process.env.PASS
      // }
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "shivankushsingh493@gmail.com",
        pass: "mgeaxwvqvefyfobl",
      },
    });
    await trasnporter.sendMail({
      from: "Fit-Buddy",
      to: email,
      subject: subject,
      html: text,
    });
    console.log(colors.yellow("email sent successfully"));
  } catch (error) {
    console.log(colors.red("some error occured try after some time"));
    console.log(error);
  }
};
