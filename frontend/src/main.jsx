import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import Cart from "./Components/Cart.jsx";
// import Grocery from "./Components/Subnavcomponents/Grocery.jsx";
// import Electronics from "./Components/Subnavcomponents/Electronics";
// import Beauty from "./Components/Subnavcomponents/Beauty";
// import Toys from "./Components/Subnavcomponents/Toys";
// import Paintings from "./Components/Subnavcomponents/Paintings";
import CategoryPageWrapper from "./Components/Subnavcomponents/CategoryPageWrap.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      // { path: "grocery", element: <Grocery /> },
      // { path: "electronics", element: <Electronics /> },
      // { path: "beauty", element: <Beauty /> },
      // { path: "toys", element: <Toys /> },
      // { path: "paintings", element: <Paintings /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <Cart /> },
      { path: "/:name", element: <CategoryPageWrapper />},
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
