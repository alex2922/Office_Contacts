const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    domain: { type: String, required: true, unique: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    option1: { type: String },
    option2: { type: String },
    splitName: { type: Boolean, default: false },
    phoneInput: { type: Boolean, default: false },
    emailNotify: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
