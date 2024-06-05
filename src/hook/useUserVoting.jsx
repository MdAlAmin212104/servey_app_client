import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";

const useUserVoting = () => {
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();

    const { data: participate = [] } = useQuery({
        queryKey: ["participate", user?.email],
        queryFn: async () => {
        const res = await axiosCommon.get(`/voting/${user?.email}`);
        return res.data;
        },
    });
    return [participate];
    
};

export default useUserVoting;