import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import useAdmin from "../../hook/useAdmin";
import useSurveyor from "../../hook/useSurveyor";
import useProUser from "../../hook/useProUser";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [ isAdmin ] = useAdmin();
  const [ isSurveyor ]= useSurveyor();
  const [ isProUser ]= useProUser();


  let text = '';

    switch (true) {
      case isAdmin:
          text = <NavLink to="/dashboard/adminHome">Dashboard</NavLink>
          break;
        case isSurveyor:
          text =<NavLink to="/dashboard/surveyorHome">Dashboard</NavLink>;
          break;
        case isProUser:
          text = <NavLink to="/dashboard/proUserHome">Dashboard</NavLink>;
          break;
        default:
          text = <NavLink to="/dashboard">Dashboard</NavLink>
    }

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/survey">Survey</NavLink>
      </li>
      <li>
        <NavLink to="/price">Pricing</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">SurveyApp</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {
          user ? <>
          {text}
          <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                
                src={user.photoURL || "https://lh3.googleusercontent.com/a/ACg8ocKfSrgZFBvoQ6s12ZB8gHSg3E625KGpnaiYthDiKIfNqh1g62wg=s96-c"} 
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button className="btn btn-primary" onClick={()=>logout()}>Logout</button>
            </li>
          </ul>
        </div>
          </>
          : <Link to ='/login' className="btn btn-primary">Login</Link>
        }
      
      </div>
    </div>
  );
};

export default Navbar;
