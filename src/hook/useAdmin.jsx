import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosNotSecure from "./useAxiosNotSecure";

const useAdmin = () => {
    const axiosNotSecure = useAxiosNotSecure()
    const { user, loading } = useAuth();
    const { data : isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled : !loading,
        queryFn: async () => {
            const res = await axiosNotSecure.get(`/user/admin/${user.email}`);
            //console.log(res.data);
            return res.data?.admin;
        },
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;