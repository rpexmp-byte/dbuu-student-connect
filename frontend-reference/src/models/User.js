
/**
 * @module Factory_User
 */

/** @typedef {import("./Profile").Profile} Profile */

/**
 * DBUU Campus User Roles
 */
const DBUUUserRoles = Object.freeze({
  STUDENT: "student",
  PASSOUT: "passout",
  MENTOR: "mentor",
});

/**
 * @typedef {Object} User
 * @property {string} strUserId
 * @property {string} strEmail
 * @property {string} strFullName
 * @property {string} strAuthMethod
 * @property {string} strProfilePicURL
 * @property {Date} dtCreatedOn
 * @property {boolean} booActive
 * @property {("student"|"passout"|"mentor")} strRole
 * @property {string} strDepartment
 * @property {string} strAcademicYear
 * @property {string} strRollNumber
 * @property {number|null} intGraduationYear
 * @property {string} strCurrentPosition
 * @property {number} intDoubtsAsked
 * @property {number} intDoubtsResolved
 * @property {Profile | null} objProfile
 */

/**
 * Shape a frontend User model including DBUU campus cohort metadata.
 * Trailing campus parameters default safely for legacy callers.
 * @param {string} strUserId
 * @param {string} strEmail
 * @param {string} strFullName
 * @param {string} strAuthMethod
 * @param {string} strProfilePicURL
 * @param {Date} dtCreatedOn
 * @param {boolean} booActive
 * @param {Object} [objCampusMeta]
 * @returns {User}
 */
function shapeUser(
  strUserId,
  strEmail,
  strFullName,
  strAuthMethod,
  strProfilePicURL,
  dtCreatedOn,
  booActive,
  objCampusMeta = {}
) {
  return {
    strUserId,
    strEmail,
    strFullName,
    strAuthMethod,
    strProfilePicURL,
    dtCreatedOn,
    booActive,
    strRole: objCampusMeta.strRole || DBUUUserRoles.STUDENT,
    strDepartment:
      objCampusMeta.strDepartment || "SoEC - Computer Science & Engineering",
    strAcademicYear: objCampusMeta.strAcademicYear || "3rd Year",
    strRollNumber: objCampusMeta.strRollNumber || "",
    intGraduationYear: objCampusMeta.intGraduationYear ?? null,
    strCurrentPosition: objCampusMeta.strCurrentPosition || "",
    intDoubtsAsked: objCampusMeta.intDoubtsAsked ?? 0,
    intDoubtsResolved: objCampusMeta.intDoubtsResolved ?? 0,
    objProfile: null,
  };
}

export { shapeUser, DBUUUserRoles };
