import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useUser = () => {
    const axiosCommon = useAxiosCommon();

    const { data : users = [], refetch } = useQuery({
        queryKey : ['users'],
        queryFn : async () => {
            const res = await axiosCommon.get('/users');
            console.log(res.data);
            return res.data;
        }
    })
    return [users, refetch];
};

export default useUser;