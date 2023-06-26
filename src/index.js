import "./index.css";
import * as ReactDOM from "react-dom/client";
import * as React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Error from "./Error";
import { Suspense } from "react";
import ShimmirUI from "./ShimmirUI";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthProvider from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<ShimmirUI />}>
            <PrivateRoute component={Home} />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<ShimmirUI />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <PrivateRoute component={Profile} />,
      },
      // {
      //   path: "/restaurant/:id",
      //   element: <RestaurantMenu />,
      // },
    ],
  },
]);
root.render(<RouterProvider router={appRouter} />);
