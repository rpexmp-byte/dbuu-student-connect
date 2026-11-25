import { useNavigate } from "react-router-dom";
import { FadeInAnimationDiv } from "../FadeInAnimationDiv";
import { RoundedTextButton } from "../form-controls";
import RoleBadge from "../RoleBadge/RoleBadge";
import { resolveAvatarUrl } from "../../utilities/CampusRoleUtils";

/** @typedef {import("../../models/User").User} User */

/**
 *
 * @param {Object} props
 * @param {User} props.objLoggedUser
 * @param {("Horizontal" | "Vertical")} props.strDirection
 * @returns {JSX.Element}
 */
export default function UserCard({ objLoggedUser, strDirection }) {
  const navigate = useNavigate();
  
  const handleViewProfileClick = () => {
    if (objLoggedUser.strUserId) {
      navigate(`/profile/${objLoggedUser.strUserId}`);
    }
  };
  return (
    <div>
      <div
        className={
          "flex items-center " +
          (strDirection === "Horizontal" ? "flex-row gap-2.5" : "flex-col")
        }
      >
        <FadeInAnimationDiv
          strDuration="duration-[3000ms]"
          className="w-14 h-14 min-w-[56px] min-h-[56px] rounded-full border-2 border-[#F58220] overflow-hidden bg-slate-100"
        >
          <img
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
            src={resolveAvatarUrl(objLoggedUser.strProfilePicURL)}
            alt={objLoggedUser.strFullName}
          />
        </FadeInAnimationDiv>

        <div className="min-w-0">
          <p className="font-bold text-[#172B52] text-[15px] leading-5 truncate">
            {objLoggedUser.strFullName}
          </p>
          <div className="mt-1">
            <RoleBadge
              role={objLoggedUser.strRole}
              academicYear={objLoggedUser.strAcademicYear}
              graduationYear={objLoggedUser.intGraduationYear}
              compact={true}
            />
          </div>
          <p className="text-slate-500 text-xs leading-4 font-medium mt-1 truncate">
            {objLoggedUser.objProfile?.objIntro?.strHeadline || objLoggedUser.strDepartment}
          </p>
        </div>
      </div>
      <div className={strDirection === "Horizontal" ? " mt-2.5" : "mt-2"}>
        <RoundedTextButton
          strColor="blue"
          strText="View Campus Profile"
          handleClick={handleViewProfileClick}
          booBorder={true}
          booFullWidth={true}
          booColoredBackground={false}
          booFitHeigth={true}
        />
      </div>
    </div>
  );
}
