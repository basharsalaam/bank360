import { lazy } from "react";

const Signup = lazy(() => import("../views/Signup/Signup"));
const Login = lazy(() => import("../views/Login/Login"));
const OTP = lazy(() => import("../views/OTP/OTP"));
const ForgotPassword = lazy(
  () => import("../views/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("../views/ResetPassword/ResetPassword")
);
const Home = lazy(() => import("../views/Home/Home"));
const Analytics = lazy(() => import("../views/Analytics/Analytics"));
const BankStatements = lazy(
  () => import("../views/BankStatements/BankStatements")
);
const DailyUpdates = lazy(() => import("../views/DailyUpdates/DailyUpdates"));
const Dashboard = lazy(() => import("../views/Dashboard/Dashboard"));
const FinancialTrends = lazy(
  () => import("../views/FinancialTrends/FinancialTrends")
);
const Settings = lazy(() => import("../views/Settings/Settings"));
const Landing = lazy(() => import("../views/Landing/Landing"));
const DownloadPdf = lazy(() => import("../views/DownloadPdf/DownloadPdf"));

export interface IRouting {
  path: string;
  element: JSX.Element;
  protected: boolean;
}

export const Routings: IRouting[] = [
  {
    path: "/",
    element: <Landing />,
    protected: false,
  },
  {
    path: "/register",
    element: <Signup />,
    protected: false,
  },
  {
    path: "/signin",
    element: <Login />,
    protected: false,
  },
  {
    path: "/confirm-otp",
    element: <OTP />,
    protected: false,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    protected: false,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    protected: false,
  },
  {
    path: "/home",
    element: <Home />,
    protected: true,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    protected: true,
  },
  {
    path: "/daily-updates",
    element: <DailyUpdates />,
    protected: true,
  },

  {
    path: "/financial-trends",
    element: <FinancialTrends />,
    protected: true,
  },
  {
    path: "/bank-statements",
    element: <BankStatements />,
    protected: true,
  },
  {
    path: "/analytics",
    element: <Analytics />,
    protected: true,
  },
  {
    path: "/settings",
    element: <Settings />,
    protected: true,
  },
  {
    path: "/d1234",
    element: <DownloadPdf />,
    protected: true,
  },
];
