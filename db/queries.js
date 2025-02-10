import mongoose from "mongoose";

const { watchModel } = require("@/models/watch-model");

const { userModel } = require("@/models/user-model");
const {
  replaceMongoIdInObject,
  replaceMongoIdInArray,
} = require("@/utils/data-util");

async function createUser(user) {
  return await userModel.create(user);
}

async function findUserByCredentials(credentials) {
  console.log(credentials);
  const user = await userModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

async function getWatchList(movieId, authId) {
  try {
    const movie = await watchModel.findOne({
      movieId,
      userId: new mongoose.Types.ObjectId(authId),
    });
    if (movie) {
      return true;
    }

    return false;
  } catch (error) {
    return error.message;
  }
}

async function watchListDetails(authId) {
  try {
    if (!authId || !mongoose.Types.ObjectId.isValid(authId)) {
      throw new Error("Invalid user ID");
    }

    console.log(`Fetching watch list for user ID: ${authId}`);

    const movies = await watchModel.find({
      userId: new mongoose.Types.ObjectId(authId),
    });

    console.log("Movies fetched:", movies);
    return movies;
  } catch (error) {
    console.error("Error fetching watch list:", error.message);
    throw new Error("Failed to fetch watch list");
  }
}

async function watchList(movieId, userId, title, releaseTime, poster) {
  try {
    const newWatchEntry = await watchModel.create({
      movieId,
      userId,
      title,
      releaseTime,
      poster,
    });

    return newWatchEntry.toObject(); // ✅ Converts to a plain object
  } catch (error) {
    console.error("Error creating watch entry:", error);
    throw error;
  }
}

async function removeWatchList(id) {
  try {
    const movie = await watchModel.findByIdAndDelete(id);

    return movie;
  } catch (error) {
    return error.message;
  }
}

export {
  createUser,
  findUserByCredentials,
  getWatchList,
  removeWatchList,
  watchList,
  watchListDetails,
};
