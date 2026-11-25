import { useNavigate } from "react-router-dom";
import { FadeInAnimationDiv } from "../../../../../../components/FadeInAnimationDiv";
import { RoleBadge } from "../../../../../../components";
import {
  Constants,
  NavigationPaths,
  resolveAvatarUrl,
} from "../../../../../../utilities";

/** @typedef {import("../../../../../../models/User").User} User */

/**
 * DBUU Student / Alumni / Faculty profile summary card in the left feed sidebar.
 * @param {Object} props
 * @param {User} props.objLoggedUser
 * @returns {JSX.Element}
 */
export default function UserInformationMain({ objLoggedUser }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (objLoggedUser?.strUserId) {
      navigate(`/profile/${objLoggedUser.strUserId}`);
    }
  };

  const avatarSrc = resolveAvatarUrl(objLoggedUser?.strProfilePicURL);
  const role = objLoggedUser?.strRole || "student";
  const department = objLoggedUser?.strDepartment || "SoEC - Computer Science & Engineering";
  const academicYear = objLoggedUser?.strAcademicYear || "3rd Year";
  const rollNumber = objLoggedUser?.strRollNumber || "";
  const graduationYear = objLoggedUser?.intGraduationYear || null;

  const headline =
    objLoggedUser?.objProfile?.objIntro?.strHeadline ===
      Constants.ProfileHeadLineEmptyName ||
    !objLoggedUser?.objProfile?.objIntro?.strHeadline
      ? department
      : objLoggedUser.objProfile.objIntro.strHeadline;

  return (
    <div className="flex flex-col w-full rounded-xl bg-white shadow-sm border border-[#E2E8F0] overflow-hidden">
      {/* Top DBUU Navy Gradient Cover (no avatar inside overflow-hidden) */}
      <FadeInAnimationDiv
        strDuration="duration-[2000ms]"
        className="relative h-16 bg-gradient-to-r from-[#172B52] via-[#223B6B] to-[#0D1A33]"
      >
        <div
          className="absolute inset-0 opacity-15 bg-center bg-cover"
          style={
            objLoggedUser?.objProfile?.strBgPicPath
              ? { backgroundImage: `url('${objLoggedUser.objProfile.strBgPicPath}')` }
              : undefined
          }
        />
        <span className="absolute top-2 right-2.5 px-2 py-0.5 rounded bg-black/25 text-[10px] font-bold tracking-wider uppercase text-white/90">
          DBUU Campus
        </span>
      </FadeInAnimationDiv>

      {/* Safe Avatar Stacking Outside Banner Clipping */}
      <div className="relative z-10 flex flex-col items-center px-4 pb-4 -mt-9">
        <button
          type="button"
          onClick={handleProfileClick}
          className="w-[72px] h-[72px] rounded-full border-4 border-white ring-2 ring-[#F58220] bg-white overflow-hidden shadow-md hover:opacity-95 transition-opacity cursor-pointer"
          aria-label="Open DBUU campus profile"
        >
          <img
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            src={avatarSrc}
            alt={objLoggedUser?.strFullName || "DBUU Member"}
            onError={(e) => {
              e.currentTarget.src = "/student_avatar.jpg";
            }}
          />
        </button>

        <button
          type="button"
          onClick={handleProfileClick}
          className="mt-2.5 text-center text-[#0F172A] hover:text-[#172B52] hover:underline font-bold text-base leading-tight capitalize break-words w-full"
        >
          {objLoggedUser?.strFullName || "DBUU Member"}
        </button>

        <div className="mt-1.5">
          <RoleBadge
            role={role}
            academicYear={academicYear}
            graduationYear={graduationYear}
          />
        </div>

        <p className="text-xs text-[#64748B] font-medium text-center mt-2 leading-snug break-words w-full">
          {headline}
        </p>

        {rollNumber ? (
          <span className="mt-1.5 text-[11px] font-semibold text-[#172B52] bg-[#F1F5F9] px-2.5 py-0.5 rounded-full">
            ID: {rollNumber}
          </span>
        ) : null}
      </div>

      {/* Campus Stats Footer */}
      <div className="border-t border-[#E2E8F0] divide-y divide-[#E2E8F0]">
        <button
          type="button"
          onClick={() => navigate(`/${NavigationPaths.MESSAGING}`)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-xs hover:bg-[#FFF9F3] transition-colors"
        >
          <span className="text-[#64748B] font-semibold">Campus Peers & Faculty</span>
          <span className="font-bold text-[#172B52]">Message →</span>
        </button>

        <div className="px-4 py-2.5 flex items-center justify-between text-xs bg-[#FFF9F3]/60">
          <span className="text-[#64748B] font-semibold">AI Helpdesk Queue</span>
          <span className="font-bold text-[#F58220] text-[11px] px-2 py-0.5 rounded-full bg-orange-100">
            Phase 2
          </span>
        </div>

        <button
          type="button"
          onClick={handleProfileClick}
          className="w-full px-4 py-2.5 text-xs font-bold text-[#172B52] flex items-center gap-2 hover:bg-[#F8FAFC] transition-colors"
        >
          <i className="fas fa-id-card text-[#F58220]" aria-hidden="true" />
          <span>View Academic Profile</span>
        </button>
      </div>
    </div>
  );
}
