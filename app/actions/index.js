"use server";

import {
  createUser,
  findUserByCredentials,
  getWatchList,
  removeWatchList,
  watchList,
  watchListDetails,
} from "@/db/queries";

async function registerUser(formData) {
  try {
    const response = await createUser(formData);
    return response;
  } catch (error) {
    throw error;
  }
}

async function performLogin(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await findUserByCredentials(credential);
    return found;
  } catch (error) {
    throw error;
  }
}

async function addWishToWatch(movieId, userId, title, releaseTime, poster) {
  try {
    return await watchList(movieId, userId, title, releaseTime, poster);
  } catch (error) {
    console.error("Error adding movie to wishlist:", error.message);
    throw new Error("Failed to add movie to wishlist. Please try again.");
  }
}

async function wishToWatchList(movieId, userId) {
  try {
    const response = await getWatchList(movieId, userId);
    return response;
  } catch (error) {
    throw error;
  }
}

async function detailWatch(userId) {
  try {
    const response = await watchListDetails(userId);
    return response;
  } catch (error) {
    throw error;
  }
}
async function removeMovie(id) {
  try {
    const movie = await removeWatchList(id);

    if (!movie) {
      return { success: false, message: "Movie not found" };
    }

    return { success: true, message: "Movie removed successfully", id };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export {
  addWishToWatch,
  detailWatch,
  performLogin,
  registerUser,
  removeMovie,
  wishToWatchList,
};
