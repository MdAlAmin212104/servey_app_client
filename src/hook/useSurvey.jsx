import { useQuery } from "@tanstack/react-query";
import useAxiosNotSecure from "./useAxiosNotSecure";

const useSurvey = (email) => {
    const axiosNotSecure = useAxiosNotSecure();
  
    const { data: survey = [], refetch } = useQuery({
      queryKey: ["survey", email],
      queryFn: async () => {
        const res = await axiosNotSecure.get(`/survey?email=${email}`);
        return res.data?.result;
      },
    });


    return [survey, refetch];
};

export default useSurvey;