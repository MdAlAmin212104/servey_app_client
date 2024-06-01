import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import login from '../../assets/login.webp'
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
const Register = () => {
    const {googleLogin, createUser, updateUserProfile}= useAuth();



    const handleGoogleLogin = () => {
        googleLogin()
           .then(() => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login success",
                showConfirmButton: false,
                timer: 1500
              });
            })
           .catch(error => Swal.fire({
            position: "top-end",
            icon: "success",
            title: error.message,
            showConfirmButton: false,
            timer: 1500
          }));
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const from = e.target
        const email = from.email.value;
        const password = from.password.value;
        const name = from.name.value;
        const photo = from.photo.value;
        console.log({email, password, name, photo});
        createUser(email, password)
          .then(() => {
            updateUserProfile(name, photo)
              .then(() => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Register success",
                  showConfirmButton: false,
                  timer: 1500
                });
              })
              .catch(error => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: error.message,
                  showConfirmButton: false,
                  timer: 1500
                });
              })
          })
          .catch(error => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: error.message,
              showConfirmButton: false,
              timer: 1500
            });
          });
    }


  return (
    <div className=" min-h-screen bg-base-200">
      <h1 className="text-5xl font-bold text-center py-8">Register now!</h1>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={login} alt="" />
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="test"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url</span>
              </label>
              <input
                type="test"
                name="photo"
                placeholder="Photo Url"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control my-0">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <div className="divider mx-8 my-0"></div> 
          <div className="my-4 flex items-center justify-center gap-8">
            <button
                onClick={handleGoogleLogin}
              aria-label="Login with Google"
              type="button"
              >
              <FaGoogle className="text-3xl"/>
            </button>
            <button
                //onClick={handleGoogleLogin}
              aria-label="Login with Google"
              type="button"
              >
              <FaFacebook className="text-3xl"/>
            </button>
            
          </div>
          <p className="text-xs text-center sm:px-6 text-gray-600 pb-4">
            Don`t have an account?
            <Link to='/login'
              rel="noopener noreferrer"
              className="underline text-gray-800 font-bold"
            >
              login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
