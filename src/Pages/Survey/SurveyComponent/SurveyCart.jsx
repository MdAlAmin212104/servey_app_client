import useSurveyDate from "../../../hook/useSurveyDate";
import { Link } from "react-router-dom";


const SurveyCart = () => {
  const [surveyData] = useSurveyDate();
  


  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 my-8">
      {surveyData.map((item) => (
        <div key={item._id} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <p>{item.desc}</p>
            <h1 className="text-2xl font-bold">
              total-votes :{" "}
              {item.votes === undefined
                ? "there are no votes"
                : (item.votes.yesVotes || 0) + (item.votes.noVotes || 0)}
            </h1>
            <div className="card-actions justify-end">
              <Link
                to={`/surveyDetails/${item._id}`}
                className="btn "
              >
                Survey Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SurveyCart;
