import { AiOutlineBars } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { useState } from "react";
import useAdmin from "../../hook/useAdmin";
import useSurveyor from "../../hook/useSurveyor";
import useProUser from "../../hook/useProUser";
import { FaHome } from "react-icons/fa";

const Slider = () => {
  const { logout } = useAuth();
  const [isActive, setActive] = useState(false);
  const [isAdmin] = useAdmin();
  const [isSurveyor] = useSurveyor();
  const [ isProUser ]= useProUser();
  const handleToggle = () => {
    setActive(!isActive);
  };

  let text = "";

  switch (true) {
    case isAdmin:
      text = (
        <div className="flex flex-col justify-between flex-1 mt-6 space-y-4 dark:text-black">
          <Link to="/dashboard/adminHome">
            <nav className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto">
              {" "}
              Admin Home
            </nav>
          </Link>
          <Link to="/dashboard/managementUsers">
            <nav className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto">
              Manage user
            </nav>
          </Link>
          <Link to="/dashboard/payment">
            <nav className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto">
              Payment
            </nav>
          </Link>
          <Link to="/dashboard/survey">
            <nav className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto">
              Survey List
            </nav>
          </Link>
        </div>
      );
      break;
    case isSurveyor:
      text = (
        <div className="flex flex-col justify-between flex-1 mt-6 space-y-4 dark:text-black">
          <Link to="/dashboard/surveyorHome">
            <nav className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto">
              Surveyor Home
            </nav>
          </Link>
          <nav className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto">
            <Link to="/dashboard/create">create Survey</Link>
          </nav>
          <Link to="/dashboard/surveyList">
            <nav className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto">
              Survey List
            </nav>
          </Link>
          <Link to="/dashboard/feedback">
            <nav className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto">
              Feedback
            </nav>
          </Link>
        </div>
      );
      break;
    case isProUser:
      text = (
      <div className="flex flex-col justify-between flex-1 mt-6 space-y-4 dark:text-black">
        <Link to='/dashboard/userHome'>
          <nav className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto">
            userHome
          </nav>
        </Link>
        <Link to='/dashboard/participate'>
          <nav className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto">
            Participate
          </nav>
        </Link>
        <Link to='/dashboard/reported'>
          <nav className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto">
            Reported
          </nav>
        </Link>
        <Link to='/dashboard/comments'>
          <nav className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto">
            Comments
          </nav>
        </Link>
      </div>);
      break;
    default:
      text = (
        <div className="flex flex-col justify-between flex-1 mt-6 space-y-4 dark:text-black">
          <NavLink className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto" to='/dashboard/userHome'>userHome</NavLink>
          <NavLink className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto" to='/dashboard/participate'>Participate</NavLink>
          <NavLink className="w-full p-2 shadow-lg rounded-lg text-center bg-rose-100 mx-auto" to='/dashboard/reported'>Reported</NavLink>
        </div>
      );
  }

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">Home</Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto ">
              <Link to="/"> <button className="btn bg-transparent border-none dark:text-black hover:text-white"><FaHome/>Home</button></Link>
            </div>
          </div>

          {text}
        </div>

        <div>
          <hr />
          <button
            onClick={logout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform dark:text-black"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium ">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Slider;
