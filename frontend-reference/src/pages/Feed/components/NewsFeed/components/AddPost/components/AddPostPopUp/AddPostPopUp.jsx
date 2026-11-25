import { useLayoutEffect, useRef } from "react";
import { PopUpPortal } from "../../../../../../../../components/PopUpPortal";
import { RoleBadge } from "../../../../../../../../components";
import { resolveAvatarUrl } from "../../../../../../../../utilities";
import { TextConent } from "./components/TextConent";

/** @typedef {import("../../../../../../../../models/User").User} User */

/**
 *
 * @param {Object} props
 * @param {User} props.objLoggedUser
 * @param {function():void} props.handleCloseEvent
 * @param {function(object):void} props.addPostToFeed
 * @returns {JSX.Element}
 */

export default function AddPostPopUp({
  objLoggedUser,
  handleCloseEvent,
  addPostToFeed,
}) {
  const refPopUp = useRef(null);
  const avatarSrc = resolveAvatarUrl(objLoggedUser?.strProfilePicURL);

  useLayoutEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      refPopUp.current.classList.remove("opacity-0");
      // @ts-ignore
      refPopUp.current.classList.add("opacity-100");
    }, 1);
  }, []);

  return (
    <PopUpPortal>
      <div
        onClick={handleCloseEvent}
        ref={refPopUp}
        className="  w-full h-full flex justify-center transition-opacity   duration-700 opacity-0 bg-color-text"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className=" w-[552px] h-fit rounded-lg bg-white mt-12"
        >
          <div className="flex justify-between px-6 py-4">
            <h2 className=" text-color-text-darker font-normal text-[22px] leading-7">
              Create a post
            </h2>
            <button
              type="button"
              onClick={handleCloseEvent}
              className=" text-color-text"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="currentColor"
                width="24"
                height="24"
                focusable="false"
              >
                <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
              </svg>
            </button>
          </div>
          <div className="border-solid border-t"></div>
          <div className="px-6 py-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E2E8F0] flex-shrink-0">
              <img
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                src={avatarSrc}
                alt={objLoggedUser.strFullName}
                onError={(e) => {
                  e.currentTarget.src = "/student_avatar.jpg";
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-[#0F172A] capitalize font-bold text-[17px] leading-6">
                  {objLoggedUser.strFullName}
                </p>
                <RoleBadge
                  role={objLoggedUser?.strRole || "student"}
                  academicYear={objLoggedUser?.strAcademicYear || "3rd Year"}
                  graduationYear={objLoggedUser?.intGraduationYear || null}
                  compact
                />
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full w-fit border border-[#CBD5E1] bg-[#FFF9F3] text-[#172B52] text-xs font-semibold">
                <i className="fas fa-university text-[#F58220]" aria-hidden="true" />
                <span>DBUU Campus Feed</span>
              </span>
            </div>
          </div>
          <TextConent
            objLoggedUser={objLoggedUser}
            addPostToFeed={addPostToFeed}
            handleClosePopUp={handleCloseEvent}
          />
          <div></div>
        </div>
      </div>
    </PopUpPortal>
  );
}
