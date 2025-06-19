import mongoose, { Types } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      Types: String,
      required: true,
      unique: true,
    },
    email: {
      Types: String,
      required: true,
      unique: true,
    },
    password: {
      Types: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt timestamps
);
const User = mongoose.model("User", UserSchema);
export default User;
