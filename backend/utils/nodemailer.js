import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail
    pass: process.env.EMAILPASSWORD 
  },
});

// Function to send mail
export const sendMail = async (receiverEmail,message) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL, // Your Gmail as sender
      to: receiverEmail, // Receiver
      subject: "Form Data",
      text: message,
    };

     await transporter.sendMail(mailOptions);


    return {
      success: true,
      message: "Mail sent successfully",
    };
  } catch (error) {
    console.log("Email Sending Error:", error.message);
    return {
      success: false,
      message: `Email sending failed: ${error.message}`,
    };
  }
};
