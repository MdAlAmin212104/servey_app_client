import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosCommon = axios.create({
  baseURL : import.meta.env.VITE_URL,
})

const useAxiosCommon = () => {
  const navigate = useNavigate()
  const { logout }= useAuth()
  axiosCommon.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
        //console.log("request stopped by interceptor", token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
  );

  // Add a response interceptor
  axiosCommon.interceptors.response.use((response) => {
      return response;
    }, async (error) => {
      
      const status = error.response.status
      //console.log('error status code : ', status);
        if(status === 401 || status === 403){
          await logout();
          navigate('/login')
        }
        return Promise.reject(error);
    }
  );


  return axiosCommon;
};

export default useAxiosCommon;
