import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosNotSecure from "./useAxiosNotSecure";

const useProUser = () => {
    const axiosNotSecure = useAxiosNotSecure()
    const { user, loading } = useAuth();
    const { data : isProUser, isPending: isProUserLoading } = useQuery({
        queryKey: [user?.email, "isProUser"],
        enabled : !loading,
        queryFn: async () => {
            const res = await axiosNotSecure.get(`/user/proUser/${user.email}`);
            return res.data?.proUser;
        },
    })
    return [isProUser, isProUserLoading]
};

export default useProUser;