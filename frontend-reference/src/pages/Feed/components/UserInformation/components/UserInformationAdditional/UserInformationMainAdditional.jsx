import { useNavigate } from "react-router-dom";
import {
  DBUU_QUICK_TAGS,
  NavigationPaths,
  showCustomTextToast,
} from "../../../../../../utilities";

/** @typedef {import("../../../../../../models/User").User} User */

/**
 * DBUU Campus Directory & Trending Academic Topics sidebar card.
 * @param {Object} props
 * @param {User} props.objLoggedUser
 * @returns {JSX.Element}
 */
// eslint-disable-next-line no-unused-vars
export default function UserInformationMainAdditional({ objLoggedUser }) {
  const navigate = useNavigate();

  return (
    <div className="w-full rounded-xl bg-white shadow-sm border border-[#E2E8F0] overflow-hidden">
      <div className="p-4 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#172B52] mb-2.5">
          Campus Shortcuts
        </h3>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => showCustomTextToast("Full Peer & Alumni Directory is queued for Phase 2.")}
            className="text-xs text-[#172B52] font-semibold hover:text-[#F58220] flex items-center gap-2 py-1 text-left transition-colors"
          >
            <i className="fas fa-users w-4 text-[#F58220]" aria-hidden="true" />
            <span>Peer & Alumni Directory</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(`/${NavigationPaths.MESSAGING}`)}
            className="text-xs text-[#172B52] font-semibold hover:text-[#F58220] flex items-center gap-2 py-1 text-left transition-colors"
          >
            <i className="fas fa-comments w-4 text-[#F58220]" aria-hidden="true" />
            <span>Mentor Direct Messages</span>
          </button>
          <button
            type="button"
            onClick={() => showCustomTextToast("Campus Placement Cell portal is queued for Phase 2.")}
            className="text-xs text-[#172B52] font-semibold hover:text-[#F58220] flex items-center gap-2 py-1 text-left transition-colors"
          >
            <i className="fas fa-briefcase w-4 text-[#F58220]" aria-hidden="true" />
            <span>Campus Placement Cell</span>
          </button>
        </div>
      </div>

      <div className="border-t border-[#E2E8F0] p-4 pt-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-2">
          Active Campus Tags
        </p>
        <div className="flex flex-wrap gap-1.5">
          {DBUU_QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => showCustomTextToast(`Topic selected: ${tag} — include it in a campus post!`)}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#172B52] hover:bg-[#FFF9F3] hover:text-[#F58220] border border-[#E2E8F0] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate(`/${NavigationPaths.MESSAGING}`)}
        className="py-2.5 w-full text-xs font-bold text-[#172B52] border-t border-[#E2E8F0] hover:bg-[#FFF9F3] transition-colors"
      >
        Open Mentor Messaging →
      </button>
    </div>
  );
}
