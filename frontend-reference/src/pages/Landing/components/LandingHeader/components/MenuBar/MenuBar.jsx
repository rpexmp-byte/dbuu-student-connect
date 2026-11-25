import React from "react";
import { ButtonImageText } from "../../../../../../components/form-controls/";
import { showCustomTextToast } from "../../../../../../utilities";

const MenuBar = () => {
  const handleCampusNotice = (label) => {
    showCustomTextToast(`Sign in or register to explore ${label} on DBUU Connect`, 3);
  };

  const handleAiPreview = () => {
    showCustomTextToast("Semantic AI Helpdesk is reserved for Phase 2!", 3);
  };

  return (
    <ul className="flex flex-row gap-1 sm:gap-2 items-center">
      <li>
        <ButtonImageText
          strTitle="Campus Feed"
          handleClick={() => handleCampusNotice("Campus Feed")}
        >
          <i className="fa-solid fa-newspaper text-lg text-[#172B52]" aria-hidden="true" />
        </ButtonImageText>
      </li>
      <li>
        <ButtonImageText
          strTitle="Mentors"
          handleClick={() => handleCampusNotice("Mentors & Peers")}
        >
          <i className="fa-solid fa-users-line text-lg text-[#172B52]" aria-hidden="true" />
        </ButtonImageText>
      </li>
      <li>
        <ButtonImageText
          strTitle="Notices"
          handleClick={() => handleCampusNotice("SoEC Notices")}
        >
          <i className="fa-solid fa-bell text-lg text-[#172B52]" aria-hidden="true" />
        </ButtonImageText>
      </li>
      <li>
        <ButtonImageText strTitle="AI (Soon)" handleClick={handleAiPreview}>
          <i className="fa-solid fa-brain text-lg text-[#F58220]" aria-hidden="true" />
        </ButtonImageText>
      </li>
    </ul>
  );
};

export { MenuBar };
