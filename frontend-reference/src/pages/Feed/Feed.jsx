import { lazy, Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MediaQueries from "../../utilities/MediaQueries";
import { getLoggedUserState } from "../../utilities/ReduxUtils";
import { LinkedInLoader } from "../../components";
//import { AdsContainer } from "";
import { NewsFeed } from "./components/NewsFeed";
import UserInformation from "./components/UserInformation/UserInformation";
const AdsContainer = lazy(() =>
  import("./components/AdsContainer").then((mod) => ({
    default: mod.AdsContainer,
  }))
);

export default function Feed() {
  const objLoggedUser = useSelector(getLoggedUserState);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    console.log("Feed mounted - showing loader");
    // Always show loader for 1.5 seconds when Feed page is loaded
    const timer = setTimeout(() => {
      console.log("Loader timeout complete - hiding loader");
      setIsInitialLoading(false);
    }, 1500);

    return () => {
      console.log("Feed unmounting - clearing timer");
      clearTimeout(timer);
    };
  }, []);

  console.log("Feed render - isInitialLoading:", isInitialLoading);

  // Show LinkedIn loader on initial load
  if (isInitialLoading) {
    console.log("Rendering LinkedInLoader");
    return <LinkedInLoader />;
  }

  return (
    <div className="bg-[#F1F5F9] min-h-screen w-full flex justify-center px-3 sm:px-6 lg:px-8 pt-4 sm:pt-5 pb-12">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 justify-center w-full max-w-[1440px]">
        {/* Left Sidebar - DBUU Student/Faculty Card */}
        {MediaQueries.minWidth640px.matches ? (
          <aside className="w-full sm:w-64 lg:w-[272px] flex-shrink-0">
            <UserInformation objLoggedUser={objLoggedUser} />
          </aside>
        ) : null}

        {/* Main Feed - Campus Posts & Notices */}
        <main className="w-full lg:flex-1 max-w-full lg:max-w-[680px] mx-auto">
          <NewsFeed objLoggedUser={objLoggedUser} />
        </main>

        {/* Right Sidebar - Phase 2 AI Helpdesk & DBUU Faculty Mentors */}
        {MediaQueries.minWidth640px.matches ? (
          <aside className="hidden xl:block w-[320px] flex-shrink-0">
            <Suspense
              fallback={
                <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E2E8F0] h-40 animate-pulse" />
              }
            >
              <AdsContainer objLoggedUser={objLoggedUser} />
            </Suspense>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
