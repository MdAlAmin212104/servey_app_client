import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hook/useAxiosCommon";
import DisplaySingleCart from "./DisplaySingleCart";

const SurveyCart = () => {
    const axiosCommon = useAxiosCommon();


    const { data : surveyData = [] } =useQuery({
        queryKey : ['surveyData'],
        queryFn : async () => {
            const res = await axiosCommon.get('/survey');
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