const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "admin",'seller'],
      default: "user"
    }
  },
  {
    timestamps: true   // This creates createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("User", userSchema);
