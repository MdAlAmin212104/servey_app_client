import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";

const useSurvey = () => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();
  
  
    const { data: survey = [], refetch } = useQuery({
      queryKey: ["survey", user?.email],
      queryFn: async () => {
        const res = await axiosCommon.get(`/survey?email=${user?.email}`);
        return res.data;
      },
    });


    return [survey, refetch];
};

export default useSurvey;