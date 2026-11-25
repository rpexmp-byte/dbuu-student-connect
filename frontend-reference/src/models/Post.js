/**
 * @module Factory_Post
 */

/**
 * @typedef {Object} Post
 * @property {string} strPostId
 * @property {string} strUserId - Owner of the Post
 * @property {string} strText
 * @property {number} intViewCount
 * @property {number} intReactionCount
 * @property {number} intCommentCount
 * @property {("photo"|"video"|"none")} strMediaType
 * @property {string} strMediaURL
 * @property {Date} dtCreatedOn
 * @property {boolean} booActive
 * @property {string[]} likes - Array of user IDs who liked the post
 * @property {Object[]} comments - Array of comment objects
 * @property {string[]} [tags] - Campus academic domain tags
 * @property {("none"|"open"|"resolved")} [queryStatus] - Doubt resolution state
 * @property {string|null} [resolvedBy] - User ID who verified/resolved the doubt
 */

/**
 *
 * @param {string} strPostId
 * @param {string} strUserId
 * @param {string} strText
 * @param {number} intViewCount
 * @param {number} intReactionCount
 * @param {number} intCommentCount
 * @param {("photo"|"video"|"none")} strMediaType
 * @param {string} strMediaURL
 * @param {Date} dtCreatedOn
 * @param {boolean} booActive
 * @param {string[]} likes
 * @param {Object[]} comments
 * @param {Object} [objCampusPostMeta]
 * @returns {Post}
 */
function shapePost(
  strPostId,
  strUserId,
  strText,
  intViewCount,
  intReactionCount,
  intCommentCount,
  strMediaType,
  strMediaURL,
  dtCreatedOn,
  booActive,
  likes = [],
  comments = [],
  objCampusPostMeta = {}
) {
  return {
    strPostId,
    strUserId,
    strText,
    intViewCount,
    intReactionCount,
    intCommentCount,
    strMediaType,
    strMediaURL,
    dtCreatedOn,
    booActive,
    likes,
    comments,
    tags: objCampusPostMeta.tags || [],
    queryStatus: objCampusPostMeta.queryStatus || "none",
    resolvedBy: objCampusPostMeta.resolvedBy || null,
  };
}

export { shapePost };
