import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import useSurveyor from "../../hook/useSurveyor";

const SurveyorRoutes = ({children}) => {
    const { user, loading}= useAuth()
    const [isSurveyor, isSurveyorLoading] = useSurveyor()
    const location = useLocation()

    if(loading || isSurveyorLoading){
        return <span className="loading loading-dots loading-md"></span>
    }

    if(user && isSurveyor){
        return children;
    }
    

    return <Navigate to='/' state={{from : location }} replace></Navigate>
};

export default SurveyorRoutes;