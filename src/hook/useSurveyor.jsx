import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";

const useSurveyor = () => {
    const axiosCommon = useAxiosCommon();
    const { user, loading } = useAuth();
    const { data : isSurveyor, isPending: isSurveyorLoading } = useQuery({
        queryKey: [user?.email, "isSurveyor"],
        enabled : !loading,
        queryFn: async () => {
            const res = await axiosCommon.get(`/user/surveyor/${user.email}`);
            return res.data?.surveyor;
        },
    })
    return [isSurveyor, isSurveyorLoading]
};

export default useSurveyor;