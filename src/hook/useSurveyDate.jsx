import { useQuery } from "@tanstack/react-query";
import useAxiosNotSecure from "./useAxiosNotSecure";

const useSurveyDate = () => {
    const axiosNotSecure = useAxiosNotSecure()

    const { data : surveyData = [], refetch } =useQuery({
        queryKey : ['surveyData'],
        queryFn : async () => {
            const res = await axiosNotSecure.get('/survey');
            return res.data.result;
        }
    })


    return [surveyData, refetch];
};

export default useSurveyDate;