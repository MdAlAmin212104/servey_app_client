import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Survey from "../Pages/Survey/Survey";
import Pricing from "../Pages/Pricing/Pricing";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Dashboard from "../layout/Dashboard";
import SurveyCreateFrom from "../Pages/Surveyor/SurveyCreateFrom/SurveyCreateFrom";

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
        },
        {
            path: '/login',
            element : <Login/>
        },
        {
            path : '/register',
            element : <Register/>
        }
      ]
    },
    {
        path : 'dashboard',
        element : <Dashboard/>,
        children : [
            {
                path : 'create',
                element : <SurveyCreateFrom/>
            }
        ]
    }
  ]);