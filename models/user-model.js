import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  firstname: {
    required: true,
    type: String,
  },
  lastname: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

export const userModel =
  mongoose.models.users ?? mongoose.model("users", schema);
