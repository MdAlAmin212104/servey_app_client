import login from "../../assets/login.webp";
import useAuth from "../../hook/useAuth";
const Login = () => {
    const { userLogIn, googleLogin } =useAuth();

    const handleGoogleLogin = () => {
        googleLogin()
           .then(res => {
                console.log(res.user);
            })
           .catch(err => console.error(err));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const from = e.target;
        const email = from.email.value;
        const password = from.password.value;

        userLogIn(email, password)
            .then(res => {
                console.log(res.user);
            })
            .catch(err => console.error(err));
    }
  return (
    <div className=" min-h-screen bg-base-200">
      <h1 className="text-5xl font-bold text-center py-8">Login now!</h1>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={login} alt="" />
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
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
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="divider mx-8 my-0"></div> 
          <div className="my-4">
            <button
                onClick={handleGoogleLogin}
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center mx-auto p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 focus:ring-violet-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p>Login with Google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
