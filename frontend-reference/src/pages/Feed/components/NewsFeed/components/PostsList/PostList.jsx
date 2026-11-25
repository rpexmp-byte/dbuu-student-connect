import PostEntry from "./components/PostEntry/PostEntry";

/** @typedef {import("../../../../../../models/User").User} User */
/** @typedef {import("../../../../../../models/Profile").Profile} Profile */
/** @typedef {import("../../../../../../models/Post").Post} Post */

/**
 *
 * @param {Object} props
 * @param {User} props.objLoggedUser
 * @param {Array<{objPost:Post,objProfile: Profile}>} props.arrPostsProfile
 * @returns {JSX.Element}
 */
export default function PostList({ objLoggedUser, arrPostsProfile }) {
  return (
    <ul className=" flex flex-col gap-2">
      {arrPostsProfile.map((objPostProfile) => {
        return (
          <li key={objPostProfile.objPost.strPostId}>
            <PostEntry
              objLoggedUser={objLoggedUser}
              objCreatorProfile={objPostProfile.objProfile}
              objPost={objPostProfile.objPost}
              intCommentsCount={0}
              intLikesCount={0}
              intSharesCount={0}
            />
          </li>
        );
      })}
    </ul>
  );
}
