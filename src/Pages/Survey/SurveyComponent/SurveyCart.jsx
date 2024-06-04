import { useQuery } from "@tanstack/react-query";
import DisplaySingleCart from "./DisplaySingleCart";
import useAxiosNotSecure from "../../../hook/useAxiosNotSecure";

const SurveyCart = () => {
    const axiosNotSecure = useAxiosNotSecure()


    const { data : surveyData = [] } =useQuery({
        queryKey : ['surveyData'],
        queryFn : async () => {
            const res = await axiosNotSecure.get('/survey');
            return res.data;
        }
    })
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 my-8">
            {surveyData.map(item => <DisplaySingleCart item={item} key={item._id}/>)}
        </div>
    );
};

export default SurveyCart;