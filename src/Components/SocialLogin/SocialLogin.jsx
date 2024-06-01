import { FaFacebook, FaGoogle } from "react-icons/fa";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const { googleLogin, facebookLogin } = useAuth()
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

    const handleFacebookLogin = () => {
      facebookLogin()
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login success",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) =>
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: error.message,
            showConfirmButton: false,
            timer: 1500,
          })
        );
    };
    return (
        <div className="my-4 flex items-center justify-center gap-8">
            <button
                onClick={handleGoogleLogin}
              aria-label="Login with Google"
              type="button"
              >
              <FaGoogle className="text-3xl"/>
            </button>
            <button
              onClick={handleFacebookLogin}
              aria-label="Login with Google"
              type="button"
              >
              <FaFacebook className="text-3xl"/>
            </button>
            
          </div>
    );
};

export default SocialLogin;