import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useNavigate } from "react-router-dom";
import UserCard from "../../../../../../components/UserCard/UserCard";
import { clearLogedUser } from "../../../../../../redux";
import { authAPI } from "../../../../../../services";
import { showCustomTextToast } from "../../../../../../utilities";
import { GroupTitle } from "./components/GroupTitle";
import { LinkOption } from "./components/LinkOption";

/** @typedef {import("../../../../../../models/User").User} User */

/**
 *
 * @param {Object} props
 * @param {User} props.objLoggedUser
 * @param {function():void} props.handleCloseEvent
 * @returns {JSX.Element}
 */
export default function UserMenu({ objLoggedUser, handleCloseEvent }) {
  const dispatch = useDispatch();
  const objNavigate = useNavigate();

  const handleComingSoonClick = (feature) => {
    showCustomTextToast(`${feature} will be enabled in the next campus update`, 3);
  };

  const handleLogOut = async () => {
    try {
      await authAPI.logoutUser();
      dispatch(clearLogedUser());
      objNavigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      tabIndex={-1}
      className="absolute w-[280px] rounded-2xl shadow-xl border border-slate-200 bg-white top-[60px] right-0 z-50 text-slate-800"
      onBlur={handleCloseEvent}
    >
      <div className="flex flex-col p-3 gap-2">
        <div>
          <UserCard objLoggedUser={objLoggedUser} strDirection="Horizontal" />
        </div>
        <div className="text-color-text-low-emphasis border-solid border-t border-slate-100 flex flex-col gap-1.5 px-1 pt-2">
          <GroupTitle strText="Campus Account" />
          <LinkOption
            strText="AI Helpdesk (Phase 2 Soon)"
            handleClick={() => handleComingSoonClick("AI Helpdesk")}
          />
          <LinkOption
            strText="Campus Guidelines"
            handleClick={() => handleComingSoonClick("Campus Guidelines")}
          />
        </div>
        <div className="flex flex-col gap-1.5 px-1 text-color-text-low-emphasis border-solid border-t border-slate-100 pt-2">
          <GroupTitle strText="Academic Activity" />
          <LinkOption
            strText="My Doubts & Posts"
            handleClick={() => {
              if (objLoggedUser.strUserId) {
                objNavigate(`/profile/${objLoggedUser.strUserId}`);
                handleCloseEvent();
              }
            }}
          />
          <LinkOption
            strText="Notifications & Notices"
            handleClick={() => {
              objNavigate("/notifications");
              handleCloseEvent();
            }}
          />
        </div>
        <div className="text-color-text-low-emphasis border-solid border-t border-slate-100 pt-2 flex items-center">
          <LinkOption strText="Sign Out" handleClick={handleLogOut} />
        </div>
      </div>
    </div>
  );
}
