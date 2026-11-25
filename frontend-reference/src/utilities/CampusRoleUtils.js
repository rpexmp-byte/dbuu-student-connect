/**
 * @module CampusRoleUtils
 * @description Shared DBUU campus role constants, badge configuration, and
 * local fallback metadata bridge until backend schema updates are applied.
 */

export const DBUU_ROLES = Object.freeze({
  STUDENT: "student",
  PASSOUT: "passout",
  MENTOR: "mentor",
});

export const DBUU_DEPARTMENTS = [
  "SoEC - Computer Science & Engineering",
  "SoEC - Artificial Intelligence & ML",
  "SoEC - Data Science",
  "SoEC - Information Technology",
  "SoEC - Electronics & Communication",
  "SoEC - Mechanical Engineering",
  "School of Management & Commerce",
];

export const DBUU_ACADEMIC_YEARS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
];

export const DBUU_QUICK_TAGS = [
  "#Review1_Synopsis",
  "#Placements",
  "#MiniProject",
  "#MERN_Stack",
  "#ExamPrep",
  "#SoECNotice",
];

const CAMPUS_META_STORAGE_KEY = "dbuu_campus_meta_v1";

/**
 * Safely read the local campus metadata store.
 * @returns {Object}
 */
function readLocalMetaStore() {
  try {
    const raw = localStorage.getItem(CAMPUS_META_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Persist DBUU campus metadata locally by userId and/or email as fallback
 * while backend endpoints omit campus fields.
 * @param {string} userId
 * @param {string} email
 * @param {Object} meta
 */
export function saveCampusMetaLocal(userId, email, meta) {
  if (!meta) return;
  try {
    const store = readLocalMetaStore();
    const cleaned = {
      role: meta.role || DBUU_ROLES.STUDENT,
      department: meta.department || DBUU_DEPARTMENTS[0],
      academicYear:
        meta.academicYear ||
        (meta.role === DBUU_ROLES.MENTOR
          ? "Faculty"
          : meta.role === DBUU_ROLES.PASSOUT
          ? "Alumni"
          : "3rd Year"),
      rollNumber: meta.rollNumber || "",
      graduationYear: meta.graduationYear ? Number(meta.graduationYear) : null,
      currentPosition: meta.currentPosition || "",
    };
    if (userId) store[`id:${userId}`] = cleaned;
    if (email) store[`email:${String(email).toLowerCase()}`] = cleaned;
    localStorage.setItem(CAMPUS_META_STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.warn("Unable to cache DBUU campus metadata locally:", error);
  }
}

/**
 * Lookup cached campus metadata by userId or email.
 * @param {string} userId
 * @param {string} email
 * @returns {Object|null}
 */
export function getCampusMetaLocal(userId, email) {
  const store = readLocalMetaStore();
  if (userId && store[`id:${userId}`]) return store[`id:${userId}`];
  if (email && store[`email:${String(email).toLowerCase()}`]) {
    return store[`email:${String(email).toLowerCase()}`];
  }
  return null;
}

/**
 * Normalize DBUU campus fields from API user objects with local fallback
 * and sensible defaults so UI renders consistently.
 * @param {Object} [apiUser={}]
 * @returns {Object}
 */
export function normalizeCampusMeta(apiUser = {}) {
  const userId = apiUser._id || apiUser.strUserId || "";
  const email = apiUser.email || apiUser.strEmail || "";
  const localMeta = getCampusMetaLocal(userId, email) || {};

  const role =
    apiUser.role ||
    apiUser.strRole ||
    apiUser.profile?.role ||
    localMeta.role ||
    DBUU_ROLES.STUDENT;

  const department =
    apiUser.department ||
    apiUser.strDepartment ||
    apiUser.profile?.department ||
    localMeta.department ||
    DBUU_DEPARTMENTS[0];

  const defaultYear =
    role === DBUU_ROLES.MENTOR
      ? "Faculty"
      : role === DBUU_ROLES.PASSOUT
      ? "Alumni"
      : "3rd Year";

  const academicYear =
    apiUser.academicYear ||
    apiUser.strAcademicYear ||
    apiUser.profile?.academicYear ||
    localMeta.academicYear ||
    defaultYear;

  const rollNumber =
    apiUser.rollNumber ||
    apiUser.strRollNumber ||
    apiUser.profile?.rollNumber ||
    localMeta.rollNumber ||
    "";

  const graduationYear =
    apiUser.graduationYear ||
    apiUser.intGraduationYear ||
    apiUser.profile?.graduationYear ||
    localMeta.graduationYear ||
    null;

  const currentPosition =
    apiUser.currentPosition ||
    apiUser.strCurrentPosition ||
    apiUser.profile?.currentPosition ||
    localMeta.currentPosition ||
    "";

  return {
    role,
    department,
    academicYear,
    rollNumber,
    graduationYear,
    currentPosition,
    doubtsAsked: apiUser.doubtsAsked ?? apiUser.intDoubtsAsked ?? 0,
    doubtsResolved: apiUser.doubtsResolved ?? apiUser.intDoubtsResolved ?? 0,
  };
}

/**
 * Resolve a safe local avatar URL if an external Cloudinary demo URL or empty string is present.
 * Follows Section 7 local asset reliability rules.
 * @param {string} url
 * @returns {string}
 */
export function resolveAvatarUrl(url) {
  if (!url || url.includes("res.cloudinary.com/demo/image/upload/default-avatar.png")) {
    return "/student_avatar.jpg";
  }
  return url;
}

/**
 * Return consistent Tailwind styling, label, and icon for DBUU role badges.
 * @param {string} role
 * @param {string} [academicYear=""]
 * @param {number|string|null} [graduationYear=null]
 * @returns {{ label: string, shortLabel: string, className: string, iconClass: string }}
 */
export function getRoleBadgeConfig(role, academicYear = "", graduationYear = null) {
  switch (role) {
    case DBUU_ROLES.PASSOUT: {
      const gradSuffix = graduationYear ? ` '${String(graduationYear).slice(-2)}` : "";
      return {
        label: `Alumni (Pass-out${gradSuffix})`,
        shortLabel: `Alumni${gradSuffix}`,
        className:
          "bg-emerald-100 text-emerald-900 border border-emerald-300",
        iconClass: "fa-solid fa-user-tie text-emerald-700",
      };
    }
    case DBUU_ROLES.MENTOR:
      return {
        label: "Mentor (Faculty SoEC)",
        shortLabel: "Mentor (Faculty)",
        className:
          "bg-amber-100 text-amber-900 border border-amber-300",
        iconClass: "fa-solid fa-chalkboard-user text-amber-700",
      };
    case DBUU_ROLES.STUDENT:
    default: {
      const yearText =
        academicYear && academicYear !== "Alumni" && academicYear !== "Faculty"
          ? ` (${academicYear})`
          : "";
      return {
        label: `Student${yearText}`,
        shortLabel: `Student${yearText}`,
        className:
          "bg-blue-100 text-[#172B52] border border-blue-200",
        iconClass: "fa-solid fa-graduation-cap text-[#172B52]",
      };
    }
  }
}
