import { shapeDBDefaultValues } from "../models";

/** @typedef {import("../models/DefaultValues").DefaultDatabaseValues} DefaultDatabaseValues */

/**
 * @module ServiceDatabaseValues
 * REST API version - uses hardcoded defaults instead of Firebase
 */

/**
 * Get default values (profile picture and background image URLs)
 * @returns {Promise<DefaultDatabaseValues | null>}
 */
const getDefaultValues = async () => {
  try {
    // Return hardcoded default values for REST API version
    // These match the backend defaults
    return shapeDBDefaultValues(
      "/student_avatar.jpg", // Default profile pic
      "" // Default background
    );
  } catch (error) {
    console.error("serviceDBValues.getDefaultValues:", error);
  }

  return null;
};

export { getDefaultValues };
