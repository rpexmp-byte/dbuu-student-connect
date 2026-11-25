import strSvgHeroImage from "./../.././../../assets/images/heroImage.svg";
import { lazy, Suspense } from "react";
import { FadeInAnimationDiv } from "../../../../components/FadeInAnimationDiv";
const HeroForm = lazy(() => import("../HeroForm/HeroForm"));

const Hero = () => {
  return (
    <section className="flex flex-col w-full max-w-6xl sm:flex-row px-4 sm:pt-[47px] pt-[24px]">
      <FadeInAnimationDiv
        className=" sm:w-[55%]"
        strDuration="duration-[5000ms]"
      >
        <Suspense>
          <HeroForm />
        </Suspense>
      </FadeInAnimationDiv>
      <FadeInAnimationDiv className="flex flex-col items-center justify-center sm:w-[45%]" strDuration="duration-[5000ms]">
        <div className="w-full bg-[#FFF9F3] border border-orange-200/70 rounded-2xl p-6 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full bg-[#172B52] text-white text-[11px] font-bold tracking-wide">
              Dev Bhoomi Uttarakhand University
            </span>
            <span className="text-[11px] font-bold text-[#F58220]">SoEC Campus Network</span>
          </div>
          <img
            loading="lazy"
            className="flip-rtl block w-full max-h-[380px] object-contain mx-auto"
            alt="Welcome to DBUU Campus Mentorship Community"
            src={strSvgHeroImage}
          />
          <div className="grid grid-cols-3 gap-2.5 mt-4 text-center">
            <div className="bg-white rounded-xl p-2.5 border border-slate-200">
              <div className="text-xs font-extrabold text-[#172B52]">Students</div>
              <div className="text-[10px] text-slate-500 mt-0.5">1st – 4th Year Peers</div>
            </div>
            <div className="bg-white rounded-xl p-2.5 border border-slate-200">
              <div className="text-xs font-extrabold text-emerald-700">Pass-outs</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Alumni Mentors</div>
            </div>
            <div className="bg-white rounded-xl p-2.5 border border-slate-200">
              <div className="text-xs font-extrabold text-[#F58220]">Mentors</div>
              <div className="text-[10px] text-slate-500 mt-0.5">SoEC Faculty Guides</div>
            </div>
          </div>
        </div>
      </FadeInAnimationDiv>
    </section>
  );
};

export { Hero };
