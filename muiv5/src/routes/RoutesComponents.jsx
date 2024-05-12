import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/Loader.jsx";
import ResponsiveAppBar from "../components/ResponsiveAppBar.jsx";

const Login = lazy(() => import("../components/Login.jsx"));
const Registration = lazy(() => import("../components/Registration.jsx"));
const Home = lazy(()=>import ("../components/Home.jsx"));

const RoutesComponents = () => {
  return (
    <BrowserRouter>
      <ResponsiveAppBar isAuthenticated={true} />
      <Routes>
        <Route index element={<Navigate replace to="home" />} />
        <Route path="home" element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
        <Route path="login" element={<Suspense fallback={<Loader />}><Login /></Suspense>} />
        <Route path="register" element={<Suspense fallback={<Loader />}> <Registration /> </Suspense>} />
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComponents;
