import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username!!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email!!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password!!"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
//in nextjs we have to tell to moongoose is there users table if not then please make that's why we use ||

export default User;
