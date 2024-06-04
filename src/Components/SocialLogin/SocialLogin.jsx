import { FaFacebook, FaGoogle } from "react-icons/fa";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosNotSecure from "../../hook/useAxiosNotSecure";

const SocialLogin = () => {
    const { googleLogin, facebookLogin } = useAuth();
    const axiosNotSecure = useAxiosNotSecure()
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/';
    const handleGoogleLogin = () => {
        googleLogin()
           .then(res => {
            navigate(from, {replace: true})
                const {displayName, email, photoURL }= res.user;
                const userInfo = {
                    name : displayName,
                    email,
                    photo : photoURL,
                    role : 'user',
                } 
                axiosNotSecure.post('/user', userInfo)
                    .then(res => {
                        if(res.data.insertedId){
                            Swal.fire("user information save successfully");
                            
                          }
                    })
              
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
        .then(res => {
            navigate('/')
            const {displayName, email, photoURL }= res.user;
                const userInfo = {
                    name : displayName,
                    email,
                    photoURL,
                    role : 'user',
                } 
            axiosNotSecure.post('/user', userInfo)
            .then(res => {
                if(res.data.insertedId){
                    Swal.fire("user information save successfully");
                  }
            })
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