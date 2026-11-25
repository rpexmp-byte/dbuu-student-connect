import { lazy, Suspense, useState, useEffect } from "react";
const Landing = lazy(() => import("./pages/Landing/Landing"));
const Feed = lazy(() => import("./pages/Feed/Feed"));
// const Profile = lazy(() => import("./pages/Profile/Profile"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
const MainMenuBar = lazy(() => import("./layouts/MainMenuBar/MainMenuBar"));
const NotificationsPage = lazy(() => import("./pages/Notifications"));
const MessagingPage = lazy(() => import("./pages/Messaging/MessagingPage"));
const PostDetailPage = lazy(() => import("./pages/PostDetail"));
const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.ToastContainer,
  }))
);
import {
  NavigationPaths,
  getStoredUserObj,
} from "./utilities";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ProfileV2 from "./pages/Profile/ProfileV2";
import { SocketProvider } from "./contexts/SocketContext";
import { ReactionProvider } from "./contexts/ReactionContext";
import { UserProvider } from "./contexts/UserContext";
import { PostModalProvider } from "./contexts/PostModalContext";

/**
 * Redirects legacy `/linkedin` and `/linkedin/*` paths to root-relative routes
 * while preserving query parameters (e.g. password reset tokens) and hashes.
 */
function LegacyLinkedinRedirect() {
  const location = useLocation();
  const targetPath = location.pathname.replace(/^\/linkedin(?=\/|$)/, "") || "/";
  return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
}

function App() {
  // Get current user from localStorage for ReactionProvider
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(getStoredUserObj());
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-changed", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-changed", handleStorageChange);
    };
  }, []);

  return (
    <Suspense>
      <BrowserRouter basename={NavigationPaths.BASE}>
        <UserProvider>
          <ReactionProvider currentUser={currentUser}>
            <SocketProvider>
              <PostModalProvider>
                <Routes>
                  <Route index element={<Landing />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route element={<MainMenuBar />}>
                    <Route path={NavigationPaths.FEED} element={<Feed />} />
                    <Route path="/profile/:userId" element={<ProfileV2 />} />
                    <Route path="/post/:postId" element={<PostDetailPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path={NavigationPaths.MESSAGING} element={<MessagingPage />} />
                    <Route path={`${NavigationPaths.MESSAGING}/:userId`} element={<MessagingPage />} />
                  </Route>
                  <Route path="/linkedin" element={<LegacyLinkedinRedirect />} />
                  <Route path="/linkedin/*" element={<LegacyLinkedinRedirect />} />
                  <Route path={NavigationPaths.UNKNOWN} element={<Navigate to="/" replace />} />
                </Routes>
              </PostModalProvider>
            </SocketProvider>
          </ReactionProvider>
        </UserProvider>
      </BrowserRouter>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
