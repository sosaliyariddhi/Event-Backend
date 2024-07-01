import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      require: [true, "Please enter email"],
      trim: true,
      toLowerCase: true,
    },
    password: {
      type: String,
      require: [true, "Please enter email"],
      trim: true,
    },
    userType: {
      type: String,
      enum: ["admin", "organizer", "attendee"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

export const User = mongoose.model("user", userSchema);
