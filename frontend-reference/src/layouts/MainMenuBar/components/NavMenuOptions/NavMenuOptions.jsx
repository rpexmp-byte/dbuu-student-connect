import { ButtonImageText } from "../../../../components/form-controls";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationPaths, showCustomTextToast } from "../../../../utilities";
import { MessagingIcon } from "../../../../components/MessagingIcon";

/**
 *
 * @param {Object} props
 * @param {boolean} [props.booMessaging=true]
 * @param {boolean} [props.booDarkBg=false]
 * @returns {JSX.Element}
 */
export function NavMenuOptions({ booMessaging = true, booDarkBg = false }) {
  const objLocation = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/" + NavigationPaths.FEED);
  };

  const handleMentorsPeersClick = () => {
    showCustomTextToast("Campus Mentors & Peers Directory filter coming in next step — use Search or Profile links to connect!", 3);
  };

  const handleAiHelpdeskClick = () => {
    showCustomTextToast("Semantic AI Helpdesk is reserved for Phase 2! Post academic doubts on Campus Feed or DM mentors directly.", 4);
  };

  return (
    <div className="flex sm:gap-2 items-center">
      <ButtonImageText
        strTitle="Campus Feed"
        handleClick={handleHomeClick}
        booDarkBg={booDarkBg}
        booSelected={
          objLocation.pathname ===
          NavigationPaths.BASE + "/" + NavigationPaths.FEED
        }
      >
        <i className="fa-solid fa-newspaper text-base" aria-hidden="true" />
      </ButtonImageText>

      <ButtonImageText
        strTitle="Mentors & Peers"
        handleClick={handleMentorsPeersClick}
        booDarkBg={booDarkBg}
      >
        <i className="fa-solid fa-users-line text-base" aria-hidden="true" />
      </ButtonImageText>

      {booMessaging ? <MessagingIcon darkBg={booDarkBg} /> : null}

      {/* Reserved Phase-2 AI Helpdesk Slot */}
      <button
        type="button"
        onClick={handleAiHelpdeskClick}
        className="hidden lg:flex flex-col items-center justify-center px-3 py-1 rounded-xl bg-white/10 hover:bg-white/15 border border-slate-500/60 text-slate-200 transition mx-1"
        title="Reserved for Phase 2 Semantic AI Helpdesk"
      >
        <div className="flex items-center space-x-1.5">
          <i className="fa-solid fa-brain text-xs text-[#F58220]" aria-hidden="true" />
          <span className="text-[9px] bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 font-bold px-1.5 py-0.5 rounded-full uppercase">
            Phase 2
          </span>
        </div>
        <span className="mt-0.5 font-semibold text-[11px] text-slate-200 whitespace-nowrap">
          AI Helpdesk (Soon)
        </span>
      </button>
    </div>
  );
}
