import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Survey from "../Pages/Survey/Survey";
import Pricing from "../Pages/Pricing/Pricing";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Dashboard from "../layout/Dashboard";
import SurveyCreateFrom from "../Pages/Surveyor/SurveyCreateFrom/SurveyCreateFrom";
import SurveyorTable from "../Pages/Surveyor/SurveyorTable/SurveyorTable";
import SurveyorUpdateFrom from "../Pages/Surveyor/SurveyorUpdateFrom/SurveyorUpdateFrom";


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
        },
        
      ]
    },
    {
        path : 'dashboard',
        element : <Dashboard/>,
        children : [
            {
                path : 'create',
                element : <SurveyCreateFrom/>
            },
            {
                path : 'surveyList',
                element : <SurveyorTable/>
            },
            {
                path : 'surveyUpdate/:id',
                element : <SurveyorUpdateFrom/>,
                loader : ({ params }) => fetch(`http://localhost:5000/survey/${params.id}`)
            }, 
             
        ]
    }
  ]);