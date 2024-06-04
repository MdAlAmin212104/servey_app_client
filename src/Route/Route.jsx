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
import SurveyDetails from "../Pages/Survey/SurveyComponent/SurveyDetails";
import Payment from "../Pages/Payment/Payment";
import PrivateRoutes from "../Private/PrivateRoutes";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import ManageUser from "../Pages/Admin/ManageUser/ManageUser";
import PaymentList from "../Pages/Admin/PaymentList/PaymentList";
import SurveyList from "../Pages/Admin/SurveyList/SurveyList";
import SurveyorDashboard from "../Pages/Surveyor/SurveyorDashboard/SurveyorDashboard";
import ProUserHome from "../Pages/ProUser/ProUserHome/ProUserHome";




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
        {   
            path : '/surveyDetails/:id',
            element : <SurveyDetails/>,
            loader : ({ params }) => fetch(`${import.meta.env.VITE_URL}/survey/${params.id}`)

        },
        {
            path : '/payment',
            element: <PrivateRoutes><Payment/></PrivateRoutes>
        }
        
      ]
    },
    {
        path : 'dashboard',
        element : <PrivateRoutes><Dashboard/></PrivateRoutes>,
        children : [

            // admin routes

            {
                path : 'adminHome',
                element : <DashboardHome/>
            },
            {
                path : 'managementUsers',
                element : <ManageUser/>
            },
            {
                path : 'payment',
                element : <PaymentList/>
            },
            {
                path : 'survey',
                element : <SurveyList/>
            },

            // surveyor routes
            {
                path : 'surveyorHome',
                element : <SurveyorDashboard/>
            },
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
                loader : ({ params }) => fetch(`${import.meta.env.VITE_URL}/survey/${params.id}`)
            }, 

            // proUser routes
            {
                path : 'proUserHome',
                element : <ProUserHome/>
            }
             
        ]
    }
  ]);