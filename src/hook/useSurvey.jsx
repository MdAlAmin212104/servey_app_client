import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosNotSecure from "./useAxiosNotSecure";

const useSurvey = () => {
    const { user } = useAuth();
    const axiosNotSecure = useAxiosNotSecure();
  
    const { data: survey = [], refetch } = useQuery({
      queryKey: ["survey", user?.email],
      queryFn: async () => {
        const res = await axiosNotSecure.get(`/survey?email=${user?.email}`);
        return res.data?.result;
      },
    });


    return [survey, refetch];
};

export default useSurvey;