import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./Root";
import HoboMap from "./HoboMap";
import RestaurantForm from "./RestaurantForm";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "HomelessMap",
    element: <HoboMap />,
  },
  {
    path: "Form",
    element: <RestaurantForm />
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
