import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";

const useProUser = () => {
    const axiosCommon = useAxiosCommon();
    const { user, loading } = useAuth();
    const { data : isProUser, isPending: isProUserLoading } = useQuery({
        queryKey: [user?.email, "isProUser"],
        enabled : !loading,
        queryFn: async () => {
            const res = await axiosCommon.get(`/user/proUser/${user.email}`);
            return res.data?.proUser;
        },
    })
    return [isProUser, isProUserLoading]
};

export default useProUser;