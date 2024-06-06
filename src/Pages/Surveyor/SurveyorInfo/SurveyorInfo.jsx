import { useLoaderData } from "react-router-dom";

const SurveyorInfo = () => {
    const survey = useLoaderData();
    //console.log(survey);
    return (
        <div>
            this is a Surveyor info
        </div>
    );
};

export default SurveyorInfo;