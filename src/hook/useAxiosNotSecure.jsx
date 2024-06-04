import axios from "axios";


const axiosNotSecure = axios.create({
    baseURL : import.meta.env.VITE_URL
})


const useAxiosNotSecure = () => {
    return axiosNotSecure;
};

export default useAxiosNotSecure;