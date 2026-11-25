import { Hero } from "./components/Hero";
import { LandingHeader } from "./components/LandingHeader";
import { RoundedTextButton } from "../../components/form-controls";
import { showCustomTextToast } from "../../utilities";
import { Credits } from "../../layouts/Credits";
import { lazy, Suspense } from "react";
import { BottomSection } from "./components/BottomSection";
const Section = lazy(() => import("./components/Section/Section"));

export default function Landing() {
  const handleGeneralClick = () => {
    showCustomTextToast("Sign in above to explore DBUU campus topics and connect with mentors.", 2.5);
    const emailInput = document.getElementById("input-text-email");
    if (emailInput) emailInput.focus();
  };

  return (
    <div className="flex flex-col h-full min-h-screen  items-center">
      <LandingHeader />
      <main className="flex flex-col items-center w-full overflow-hidden">
        <Hero />
        <Suspense>
          <Section
            strTitle="Explore academic domains & help topics"
            strSubTitle="CAMPUS DOMAINS"
            strColor="ligth-gray"
          >
            <>
              <RoundedTextButton
                handleClick={handleGeneralClick}
                strColor="blue"
                strText="All Campus Tags"
                booBorder={true}
                booColoredBackground={false}
                booFullWidth={false}
              ></RoundedTextButton>
              <RoundedTextButton
                handleClick={handleGeneralClick}
                strColor="gray"
                strText="#Review1_Synopsis"
                booBorder={true}
                booColoredBackground={false}
                booFullWidth={false}
              ></RoundedTextButton>
              <RoundedTextButton
                handleClick={handleGeneralClick}
                strColor="gray"
                strText="#Placements"
                booBorder={true}
                booColoredBackground={false}
                booFullWidth={false}
              ></RoundedTextButton>
              <RoundedTextButton
                handleClick={handleGeneralClick}
                strColor="gray"
                strText="#MiniProject"
                booBorder={true}
                booColoredBackground={false}
                booFullWidth={false}
              ></RoundedTextButton>
              <RoundedTextButton
                handleClick={handleGeneralClick}
                strColor="gray"
                strText="#MERN_Stack"
                booBorder={true}
                booColoredBackground={false}
                booFullWidth={false}
              ></RoundedTextButton>
              <RoundedTextButton
                handleClick={handleGeneralClick}
                strColor="gray"
                strText="#FastAPI"
                booBorder={true}
                booColoredBackground={false}
                booFullWidth={false}
              ></RoundedTextButton>
              <RoundedTextButton
                handleClick={handleGeneralClick}
                strColor="gray"
                strText="#ExamPrep"
                booBorder={true}
                booColoredBackground={false}
                booFullWidth={false}
              ></RoundedTextButton>
              <RoundedTextButton
                handleClick={handleGeneralClick}
                strColor="gray"
                strText="#SoECNotice"
                booBorder={true}
                booColoredBackground={false}
                booFullWidth={false}
              ></RoundedTextButton>
            </>
          </Section>
          <Section
            strTitle="Connect across DBUU campus cohorts"
            strSubTitle="MENTORSHIP NETWORK"
            strColor="white"
          >
            <div>
              <div className="flex flex-wrap gap-x-[6px] gap-y-3 text-[19px] sm:text-[21px] font-bold">
                <RoundedTextButton
                  handleClick={handleGeneralClick}
                  strColor="gray"
                  strText="Faculty Mentors (SoEC)"
                  booBorder={true}
                  booColoredBackground={false}
                  booFullWidth={false}
                ></RoundedTextButton>
                <RoundedTextButton
                  handleClick={handleGeneralClick}
                  strColor="gray"
                  strText="Alumni Pass-outs"
                  booBorder={true}
                  booColoredBackground={false}
                  booFullWidth={false}
                ></RoundedTextButton>
                <RoundedTextButton
                  handleClick={handleGeneralClick}
                  strColor="gray"
                  strText="4th Year Seniors"
                  booBorder={true}
                  booColoredBackground={false}
                  booFullWidth={false}
                ></RoundedTextButton>
                <RoundedTextButton
                  handleClick={handleGeneralClick}
                  strColor="gray"
                  strText="3rd Year B.Tech CSE"
                  booBorder={true}
                  booColoredBackground={false}
                  booFullWidth={false}
                ></RoundedTextButton>
                <RoundedTextButton
                  handleClick={handleGeneralClick}
                  strColor="gray"
                  strText="AI & ML Track"
                  booBorder={true}
                  booColoredBackground={false}
                  booFullWidth={false}
                ></RoundedTextButton>
                <RoundedTextButton
                  handleClick={handleGeneralClick}
                  strColor="gray"
                  strText="Training & Placement"
                  booBorder={true}
                  booColoredBackground={false}
                  booFullWidth={false}
                ></RoundedTextButton>
              </div>
            </div>
          </Section>
          <Section
            strTitle="Have an academic doubt or project question?"
            strSubTitle=""
            strColor="ligth-orange"
          >
            <RoundedTextButton
              handleClick={handleGeneralClick}
              strColor="blue"
              strText="Ask Campus Feed"
              booBorder={true}
              booColoredBackground={false}
              booFullWidth={false}
            ></RoundedTextButton>
          </Section>
        </Suspense>
        {/* <Suspense> */}
        <BottomSection handleClick={handleGeneralClick} />
        {/* </Suspense> */}
      </main>
      <footer className=" bg-color-blue text-white text-sm  w-full h-12 mt-[-2px] sm:mt-[-8px]">
        <Credits />
      </footer>
    </div>
  );
}
// bg-[right_bottom_-11rem]
