import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { NavigationPaths } from "../../../../utilities";
import { SearchBox } from "../SearchBox/";
import { NavMenuOptions } from "../NavMenuOptions/NavMenuOptions";
import { FadeInAnimationDiv } from "../../../../components/FadeInAnimationDiv/FadeInAnimationDiv";
import NotificationBell from "../../../../components/NotificationBell";
const UserDisplay = lazy(() => import("./components/UserDisplay/UserDisplay"));

/** @typedef {import("../../../../models/User").User} User */

/**
 * Desktop top navigation bar themed for DBUU Student Connect.
 * @param {Object} props
 * @param {User} props.objLoggedUser
 * @returns {JSX.Element}
 */
export function DesktopNavBar({ objLoggedUser }) {
  return (
    <nav className="hidden sm:flex justify-center w-full shadow-md border-b border-[#0D1A33] bg-[#172B52] text-white sticky top-0 z-50">
      <FadeInAnimationDiv
        strDuration="duration-700"
        className="flex flex-row gap-4 justify-between items-center w-full max-w-[1720px] px-6 h-16"
      >
        <div className="flex items-center space-x-5 min-w-0">
          <Link
            to={"/" + NavigationPaths.FEED}
            className="flex items-center space-x-3 flex-shrink-0 group"
          >
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow p-0.5 border-2 border-[#F58220] overflow-hidden group-hover:scale-105 transition-transform">
              <img
                src="/dbuu_crest.jpg"
                alt="DBUU Crest"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="hidden md:block">
              <div className="font-extrabold text-base leading-tight tracking-wider text-white">
                DBUU CONNECT
              </div>
              <div className="text-[11px] text-slate-300 font-medium tracking-wide">
                Intra-College Mentorship Platform
              </div>
            </div>
          </Link>

          <div className="w-[320px] xl:w-[420px]">
            <SearchBox objLoggedUser={objLoggedUser} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <NavMenuOptions booDarkBg={true} />

          <NotificationBell darkBg={true} label="Notices" />

          <Suspense>
            <UserDisplay objLoggedUser={objLoggedUser} />
          </Suspense>
        </div>
      </FadeInAnimationDiv>
    </nav>
  );
}
