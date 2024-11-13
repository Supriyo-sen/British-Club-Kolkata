import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/form/Sidebar";
import { locations } from "./constants";
import Loader from "./components/ui/loader";
import MemberPage from "./pages/Home/MemberPage";
import Analytics from "./pages/Home/Analytics";

const ErrorPage = lazy(() => import("./pages/Error/NotFound"));
const ClubLogin = lazy(() => import("./pages/Login/ClubLogin"));
const ClubSignUp = lazy(() => import("./pages/Signup/ClubSignUp"));
const ClubSignUpOtp = lazy(() => import("./pages/Signup/Club-signUp-otp"));
const ClubSignUpOtpResend = lazy(() =>
  import("./pages/Signup/Club-signUp-otp-resend")
);
const OperatorSignup = lazy(() => import("./pages/Signup/OperatorSignup"));
const OperatorSignUpOtp = lazy(() =>
  import("./pages/Signup/Operator-forgot-pass")
);
const OperatorResetPass = lazy(() =>
  import("./pages/Signup/Operator-forgotpass-reset")
);
const OperatorResetPassMail = lazy(() =>
  import("./pages/Signup/Operator-forgotpass-mail")
);
const OperatorLogin = lazy(() => import("./pages/Login/OperatorLogin"));
const Dashboard = lazy(() => import("./pages/Home/Dashboard"));
const Member = lazy(() => import("./pages/Home/Member"));
const Coupon = lazy(() => import("./pages/Home/Coupon"));
const Settings = lazy(() => import("./pages/Home/Settings"));
const Profile = lazy(() => import("./pages/Home/Profile"));
const SettingsAdmin = lazy(() => import("./pages/Home/SettingsAdmin"));
const SettingsAdminTemp = lazy(() => import("./pages/Home/SettingsAdminTemp"));
const ClubForgotPass = lazy(() => import("./pages/Signup/Club-forgot-pass"));
const ClubLoginTemp = lazy(() => import("./pages/Login/Club-login-temp"));

function App() {
  const location = useLocation();
  return (
    <Suspense fallback={<Loader />}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 1500,
        }}
      />
      {locations.includes(location.pathname) ? <Sidebar /> : null}
      <Routes>
        {/*Routes for Main pages */}
        <>
          <Route path="/" element={<Dashboard />} />

          <>
            <Route path="/member" element={<Member />} />
            <Route path="/coupon" element={<Coupon />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/analytics" element={<Analytics />} />
          </>
        </>

        {/* Routes for Settings*/}
        <>
          <Route path="/settings/admin" element={<SettingsAdmin />} />

          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/admin/temp" element={<SettingsAdminTemp />} />
        </>

        {/* Routes for Club Auths */}
        <>
          <>
            <Route path="/signup/club" element={<ClubSignUp />} />
            <Route path="/login/club" element={<ClubLogin />} />
            <Route path="/signup/club/otp" element={<ClubSignUpOtp />} />
            <Route
              path="/signup/club/otp/resend"
              element={<ClubSignUpOtpResend />}
            />
            <Route path="/login/club/forgotPass" element={<ClubForgotPass />} />
            <Route path="/login/club/temp" element={<ClubLoginTemp />} />
          </>

          {/* Routes for Operator Auths */}
          <>
            <Route path="/signup/operator" element={<OperatorSignup />} />
            <Route path="/login/operator" element={<OperatorLogin />} />
            <Route
              path="/login/operator/forgotPass"
              element={<OperatorSignUpOtp />}
            />
            <Route
              path="/login/operator/forgotPass/mail"
              element={<OperatorResetPassMail />}
            />
            <Route
              path="/operator/reset-password/:token"
              element={<OperatorResetPass />}
            />
          </>
        </>

        <>
          <Route path="/member/data/:key/:id" element={<MemberPage />} />
          <Route path="*" element={<ErrorPage />} />
        </>
      </Routes>
    </Suspense>
  );
}

export default App;
