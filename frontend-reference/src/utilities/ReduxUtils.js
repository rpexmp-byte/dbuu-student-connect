
/** @typedef {import("../redux/store").RootState} RootState */
/** @typedef {import("../models/User").User} User */

/**
 * @param {RootState} state
 * @returns {User}
 */
export const getLoggedUserState = (state) => state.loggedUser.value;
