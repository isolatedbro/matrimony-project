import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Registration from "./routes/Auth/Registration.jsx";
import Home from "./routes/Home/Home.jsx";
import ProfilePage from "./routes/ProfilePage/ProfilePage.jsx";
import Authentcation from "./routes/Auth/Authentication.jsx";
import Login from "./routes/Auth/Login.jsx";


import { useRouteError } from "react-router";

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <div style={{ padding: 20 }}>
      <h1>Something broke</h1>
      <pre>{error?.message || JSON.stringify(error)}</pre>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: ErrorBoundary,
    children: [
      { index: true, Component: Home },
      {
        path: "auth",
        Component: Authentcation,
      },
      { path: "auth/login", Component: Login },
      {
        path: "auth/registration",
        Component: Registration,
      },

      { path: "profile", Component: ProfilePage },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
