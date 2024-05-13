import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/Loader.jsx";
import ResponsiveAppBar from "../components/ResponsiveAppBar.jsx";
import PersistLogin from "../components/PersistLogin.jsx";
import RequireAuth from "../components/RequireAuth.jsx";

const Login = lazy(() => import("../components/Login.jsx"));
const Registration = lazy(() => import("../components/Registration.jsx"));
const Home = lazy(() => import("../components/Home.jsx"));

const ROLES = {
  User: 'User',
  Editor: 'Editor',
  Admin: 'Admin'
}

const AppBar = () => {
  const currentPath = window.location.pathname;
  if (!["/login", "/register"].includes(currentPath)) {
    return <ResponsiveAppBar isAuthenticated={true} />;
  }
  return null;
};

const RoutesComponents = () => {
  return (
    <BrowserRouter>
      <AppBar /> {/* Render the AppBar component */}
      <Routes>
        <Route path="login" element={<Suspense fallback={<Loader />}><Login /></Suspense>} />
        <Route path="register" element={<Suspense fallback={<Loader />}> <Registration /> </Suspense>} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
          </Route>
        </Route>
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponents;
