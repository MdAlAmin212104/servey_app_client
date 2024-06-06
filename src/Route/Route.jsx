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
import SurveyorDetailsPage from "../Pages/Surveyor/SurveyorDetailsPage/SurveyorDetailsPage";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import SurveyorRoutes from "./SurveyorRoutes/SurveyorRoutes";
import UserHome from "../Pages/User/UserDashboard/UserHome";
import Participate from "../Pages/User/Participate/Participate";
import Reported from "../Pages/User/Reported/Reported";
import Comments from "../Pages/ProUser/ProUserHome/Comments/Comments";
import ProUserRoutes from "./ProUserRoutes/ProUserRoutes";
import SurveyFeedback from "../Pages/Surveyor/SurveyFeedback/SurveyFeedback";




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
                element : <AdminRoutes><DashboardHome/></AdminRoutes>
            },
            {
                path : 'managementUsers',
                element : <AdminRoutes><ManageUser/></AdminRoutes>
            },
            {
                path : 'payment',
                element : <AdminRoutes><PaymentList/></AdminRoutes>
            },
            {
                path : 'survey',
                element : <AdminRoutes><SurveyList/></AdminRoutes>
            },


            // surveyor routes
            {
                path : 'surveyorHome',
                element : <SurveyorRoutes><SurveyorDashboard/></SurveyorRoutes>
            },
            {
                path : 'create',
                element : <SurveyorRoutes><SurveyCreateFrom/></SurveyorRoutes>
            },
            {
                path : 'surveyList',
                element : <SurveyorRoutes><SurveyorTable/></SurveyorRoutes>
            },
            {
                path : 'surveyUpdate/:id',
                element : <SurveyorRoutes><SurveyorUpdateFrom/></SurveyorRoutes>,
                loader : ({ params }) => fetch(`${import.meta.env.VITE_URL}/survey/${params.id}`)
            }, 
            {
                path : 'surveyor/surveys/:id',
                element : <SurveyorRoutes><SurveyorDetailsPage/></SurveyorRoutes>,
                loader : ({ params }) => fetch(`${import.meta.env.VITE_URL}/survey/${params.id}`)
            },
            {
                path : 'feedback',
                element : <SurveyorRoutes><SurveyFeedback/></SurveyorRoutes>

            },

            // user routes
            {
                path : 'userHome',
                element : <UserHome/>,
            },
            {
                path : 'participate',
                element : <Participate/>,
            },
            {
                path : 'reported',
                element : <Reported/>,
            },

            // proUser routes
            {
                path : 'comments',
                element : <ProUserRoutes><Comments/></ProUserRoutes>
            }
             
        ]
    }
  ]);