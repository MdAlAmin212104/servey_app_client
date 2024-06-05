import DisplaySingleCart from "./DisplaySingleCart";
import useSurveyDate from "../../../hook/useSurveyDate";

const SurveyCart = () => {
    const [surveyData]= useSurveyDate();


   
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 my-8">
            {surveyData.map(item => <DisplaySingleCart item={item} key={item._id}/>)}
        </div>
    );
};

export default SurveyCart;