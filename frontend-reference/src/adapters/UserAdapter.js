import { shapeUser } from "../models/User";

/** @typedef {import("../models/User").User} User */

/**
 *
 * @param {Object} objRawUser
 * @returns {User | null}
 */
const userFromDataBase = (objRawUser) => {
  try {
    const objUser = shapeUser(
      objRawUser.strUserId,
      objRawUser.strEmail,
      objRawUser.strFullName,
      objRawUser.strAuthMethod,
      objRawUser.strProfilePicURL,
      objRawUser.dtCreatedOn.toDate(),
      objRawUser.booActive,
      {
        strRole: objRawUser.strRole,
        strDepartment: objRawUser.strDepartment,
        strAcademicYear: objRawUser.strAcademicYear,
        strRollNumber: objRawUser.strRollNumber,
        intGraduationYear: objRawUser.intGraduationYear,
        strCurrentPosition: objRawUser.strCurrentPosition,
      }
    );

    if (objUser) {
      return objUser;
    }
  } catch (error) {
    console.error("UserAdapter.fromDataBase:", error);
  }

  return null;
};

/**
 * Converts the object to be serializable
 * @param {User} objUser
 * @returns {Object}
 */
const userToReduxStore = (objUser) => {
  return { ...objUser, dtCreatedOn: objUser.dtCreatedOn.getTime() };
};

/**
 * Converts the input parameter into a User object
 * @param {Object} objRawUser
 * @returns {Object}
 */
const userFromReduxStore = (objRawUser) => {
  return { ...objRawUser, dtCreatedOn: new Date(objRawUser.dtCreatedOn) };
};

export { userFromDataBase, userToReduxStore, userFromReduxStore };
