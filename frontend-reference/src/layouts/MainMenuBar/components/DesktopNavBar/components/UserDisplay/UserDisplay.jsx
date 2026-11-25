import { useState } from "react";
import { FadeInAnimationDiv } from "../../../../../../components/FadeInAnimationDiv/";
import { UserMenu } from "../UserMenu";
import { getRoleBadgeConfig, resolveAvatarUrl } from "../../../../../../utilities/CampusRoleUtils";

/** @typedef {import("../../../../../../models/User").User} User */

/**
 *
 * @param {Object} props
 * @param {User} props.objLoggedUser
 * @returns {JSX.Element}
 */
export default function UserDisplay({ objLoggedUser }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const roleInfo = getRoleBadgeConfig(
    objLoggedUser.strRole,
    objLoggedUser.strAcademicYear,
    objLoggedUser.intGraduationYear
  );

  const handleClick = () => {
    setShowPopUp((preState) => !preState);
  };

  const closeMenu = () => {
    setShowPopUp(false);
  };
  return (
    <div className="relative border-l border-slate-600/70 pl-4 ml-2">
      <button
        type="button"
        className="flex items-center gap-2.5 h-[52px] text-white hover:opacity-95 transition"
        onClick={handleClick}
      >
        <FadeInAnimationDiv strDuration="duration-1000">
          <img
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full border-2 border-[#F58220] object-cover object-top bg-white"
            src={resolveAvatarUrl(objLoggedUser.strProfilePicURL)}
            alt={objLoggedUser.strFullName}
          />
        </FadeInAnimationDiv>
        <div className="text-left hidden lg:block">
          <div className="font-bold text-xs text-white leading-none max-w-[130px] truncate">
            {objLoggedUser.strFullName || "Campus User"}
          </div>
          <div className="text-[10px] text-amber-300 font-semibold mt-1 whitespace-nowrap">
            {roleInfo.shortLabel}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          data-supported-dps="16x16"
          fill="currentColor"
          width="14"
          height="14"
          className="text-slate-300"
          focusable="false"
        >
          <path d="M8 11L3 6h10z" fillRule="evenodd"></path>
        </svg>
      </button>
      {showPopUp ? (
        <UserMenu objLoggedUser={objLoggedUser} handleCloseEvent={closeMenu} />
      ) : null}
    </div>
  );
}
