import { useQuery } from "@tanstack/react-query";
import useAxiosNotSecure from "../../../hook/useAxiosNotSecure";
import { Link } from "react-router-dom";

const MostVotingSurvey = () => {
  const axiosNotSecure = useAxiosNotSecure();

  const { data: mostVotingSurvey = [] } = useQuery({
    queryKey: ["mostVotingSurvey"],
    queryFn: async () => {
      const res = await axiosNotSecure.get("/survey");
      return res.data.MostVotingSurvey;
    },
  });

  return (
    <>
      <h1 className="md:text-5xl text-3xl my-6 font-bold text-center text-green-400">Most Voting Survey</h1>
      <div className="grid md:grid-cols-3 gap-4 my-8">
        {mostVotingSurvey.map((item) => (
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
                <Link to={`/surveyDetails/${item._id}`} className="btn ">
                  Survey Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MostVotingSurvey;
