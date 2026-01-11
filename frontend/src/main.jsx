import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import Cart from "./Components/Cart.jsx";
import Signup from "./Components/Signup.jsx";
import CategoryPage from "./Components/Subnavcomponents/CategoryPage.jsx";
import AdminHome from "./Components/Admin/AdminHome.jsx";
import CreateProducts from "./Components/Admin/CreateProduct.jsx";
import Order from "./Components/Payment/Order.jsx";
import PaymentForm from "./Components/Payment/PaymentForm.jsx";
import Aboutus from "./Components/Footer Components/Aboutus.jsx";
import Contact from "./Components/Footer Components/Contact.jsx";
import SearchedProd from "./Components/Subnavcomponents/SearchedProd.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "about", element: <Aboutus /> },
      { path: "contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order", element: <Order /> },
      { path: `/payment/:id`, element: <PaymentForm/> },
      { path: "admin", element: <AdminHome /> },
      { path: "admin/create", element: <CreateProducts /> },
      { path: "login/signup", element: <Signup /> },
      { path: "/:name", element: <CategoryPage /> },
      { path: "/search", element: <SearchedProd/>}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
