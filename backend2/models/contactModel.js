const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    fname: { type: String },
    lname: { type: String },
    fullname: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    option1: { type: String },
    option2: { type: String },
    domain: { type: String, required: true },

    // Relation with User model (created_by stores User's _id)
    created_by: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
