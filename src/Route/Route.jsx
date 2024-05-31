import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Survey from "../Pages/Survey/Survey";
import Pricing from "../Pages/Pricing/Pricing";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: '/survey',
            element: <Survey/>,
        },
        {
            path : '/price',
            element: <Pricing/>,
        }
      ]
    },
  ]);