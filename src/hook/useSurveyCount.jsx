import { useQuery } from "@tanstack/react-query";
import useAxiosNotSecure from "./useAxiosNotSecure";

const useSurveyCount = () => {
    const axiosNotSecure = useAxiosNotSecure()

    const { data : surveyCount = [] } =useQuery({
        queryKey : ['surveyCount'],
        queryFn : async () => {
            const res = await axiosNotSecure.get('survey/count');
            return res.data;
        }
    })
    return {surveyCount};
};

export default useSurveyCount;