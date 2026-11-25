import {
  DBUU_QUICK_TAGS,
  resolveAvatarUrl,
} from "../../../../../../utilities";
import { usePostModal } from "../../../../../../contexts/PostModalContext";

/** @typedef {import("../../../../../../models/User").User} User */

/**
 * DBUU Campus Doubt & Project Post Composer card.
 * @param {Object} props
 * @param {User} props.objLoggedUser
 * @param {function(object):void} props.addPostToFeed
 * @returns {JSX.Element}
 */
// eslint-disable-next-line no-unused-vars
export default function AddPost({ objLoggedUser, addPostToFeed }) {
  const { openPostModal } = usePostModal();
  const avatarSrc = resolveAvatarUrl(objLoggedUser?.strProfilePicURL);

  return (
    <div className="w-full flex flex-col rounded-xl border border-[#E2E8F0] shadow-sm bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full overflow-hidden border border-[#E2E8F0] flex-shrink-0 bg-[#FFF9F3]">
          <img
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            src={avatarSrc}
            alt={objLoggedUser?.strFullName || "DBUU User"}
            onError={(e) => {
              e.currentTarget.src = "/student_avatar.jpg";
            }}
          />
        </div>
        <button
          type="button"
          onClick={openPostModal}
          className="flex-1 text-left border border-[#CBD5E1] rounded-full py-2.5 px-4 text-[#64748B] text-sm font-semibold hover:bg-[#FFF9F3] hover:border-[#F58220] transition-colors"
        >
          Ask a campus doubt, share a project update, or post a SoEC notice...
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-[#F1F5F9]">
        <div className="flex flex-wrap gap-1.5">
          {DBUU_QUICK_TAGS.slice(0, 4).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={openPostModal}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#172B52] hover:bg-orange-50 hover:text-[#F58220] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={openPostModal}
          className="px-4 py-1.5 rounded-full bg-[#172B52] hover:bg-[#0D1A33] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <i className="fas fa-pen text-[10px]" aria-hidden="true" />
          <span>Compose Post</span>
        </button>
      </div>
    </div>
  );
}
