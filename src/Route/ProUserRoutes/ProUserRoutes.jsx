import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import useProUser from "../../hook/useProUser";

const ProUserRoutes = ({children}) => {
    const { user, loading}= useAuth()
    const [isProUser, isProUserLoading] = useProUser()
    const location = useLocation()

    if(loading || isProUserLoading){
        return <span className="loading loading-dots loading-md"></span>
    }

    if(user && isProUser){
        return children;
    }
    

    return <Navigate to='/' state={{from : location }} replace></Navigate>
};

export default ProUserRoutes;