import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  movieId: {
    required: true,
    type: String,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  poster: { type: String, required: true },
  releaseTime: { type: String, required: true },
});

export const watchModel =
  mongoose.models.watchList ?? mongoose.model("watchList", schema);
