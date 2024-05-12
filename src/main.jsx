import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { HelmetProvider } from "react-helmet-async";
import AddVolunteerPost from "./pages/AddVolunteerPost.jsx";
import Privateroute from "./components/PrivateRoute.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import ManageMyPost from "./pages/ManageMyPost.jsx";
import UpdatePost from "./pages/UpdatePost.jsx";
import NeedVolunteer from "./pages/NeedVolunteer.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/addVolunteerPost",
        element: (
          <Privateroute>
            <AddVolunteerPost />,
          </Privateroute>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <Privateroute>
            <PostDetails />,
          </Privateroute>
        ),
      },
      {
        path: "/manageMyPost",
        element: (
          <Privateroute>
            <ManageMyPost />,
          </Privateroute>
        ),
      },
      {
        path: "/updatePost/:id",
        element: (
          <Privateroute>
            <UpdatePost />,
          </Privateroute>
        ),
      },
      {
        path: "/needVolunteer",
        element: <NeedVolunteer />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
