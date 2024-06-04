import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosNotSecure from "./useAxiosNotSecure";

const useSurveyor = () => {
    const axiosNotSecure = useAxiosNotSecure()
    const { user, loading } = useAuth();
    const { data : isSurveyor, isPending: isSurveyorLoading } = useQuery({
        queryKey: [user?.email, "isSurveyor"],
        enabled : !loading,
        queryFn: async () => {
            const res = await axiosNotSecure.get(`/user/surveyor/${user.email}`);
            return res.data?.surveyor;
        },
    })
    return [isSurveyor, isSurveyorLoading]
};

export default useSurveyor;