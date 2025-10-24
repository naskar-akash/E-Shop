import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import Cart from "./Components/Cart.jsx";
import Signup from "./Components/Signup.jsx";
import CategoryPageWrapper from "./Components/Subnavcomponents/CategoryPageWrap.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <Cart /> },
      { path: "login/signup", element: <Signup /> },
      { path: "/:name", element: <CategoryPageWrapper /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
