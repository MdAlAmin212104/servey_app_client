
import { Outlet } from "react-router-dom";
import Slider from "../Components/Slider/Slider";



const Dashboard = () => {


    return (
        <>
            <Slider/>
            <div className='flex-1 md:ml-64'>
                <div className='p-5'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Dashboard;