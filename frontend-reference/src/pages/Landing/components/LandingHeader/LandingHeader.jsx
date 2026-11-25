import React from "react";
import { FadeInAnimationDiv } from "../../../../components/FadeInAnimationDiv";
import { RoundedTextButton } from "../../../../components/form-controls/RoundedTextButton";
import MediaQueries from "../../../../utilities/MediaQueries";
import { HamburguerMenu } from "./components/HamburguerMenu";
import { MenuBar } from "./components/MenuBar";

const LandingHeader = () => {
  const scrollToForm = (mode) => {
    if (mode && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("dbuu-auth-mode", { detail: mode }));
    }
    // Scroll to the hero form section smoothly
    const heroSection = document.querySelector("form");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "center" });
      // Focus on the email input
      setTimeout(() => {
        const emailInput = document.getElementById("input-text-email");
        if (emailInput) emailInput.focus();
      }, 300);
    }
  };

  const onClickJoinNow = () => {
    scrollToForm("register");
  };
  
  const onClicksignIn = () => {
    scrollToForm("login");
  };

  return (
    <header className="w-full flex justify-center">
      <nav className="flex-1 pt-3 pb-2 flex items-center justify-between relative flex-nowrap w-full max-w-6xl px-4">
        {/* HorizontalMenu */}
        {/* Hambuger Menu */}

        {!MediaQueries.minWidth640px.matches ? (
          <div>
            <HamburguerMenu />
          </div>
        ) : null}

        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow p-0.5 border-2 border-[#F58220] overflow-hidden flex-shrink-0">
            <img
              src="/dbuu_crest.jpg"
              alt="DBUU Crest"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div>
            <div className="font-extrabold text-lg leading-tight tracking-wider text-[#172B52]">
              DBUU CONNECT
            </div>
            <div className="text-[11px] text-slate-500 font-medium tracking-wide">
              Intra-College Mentorship Platform
            </div>
          </div>
        </div>
        {/* NormalMenu */}
        {MediaQueries.minWidth640px.matches ? (
          <FadeInAnimationDiv
            className="hidden sm:flex sm:gap-1"
            strDuration="duration-[4500ms]"
          >
            <div className="flex items-center justify-center">
              <MenuBar />
              <span className=" border-r border-color-gray-medium border-solid h-9"></span>
            </div>
            <RoundedTextButton
              strColor="gray"
              strText="Join now"
              booBorder={false}
              handleClick={onClickJoinNow}
            />
            <RoundedTextButton
              strColor="blue"
              strText="Sign in"
              booBorder={true}
              handleClick={onClicksignIn}
            />
          </FadeInAnimationDiv>
        ) : null}

        <div className="flex items-baseline justify-center sm:hidden">
          <RoundedTextButton
            strColor="blue"
            strText="Join now"
            booBorder={true}
            handleClick={onClicksignIn}
          />
        </div>
      </nav>
    </header>
  );
};

export { LandingHeader };
