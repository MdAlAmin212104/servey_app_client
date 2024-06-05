import { Link } from "react-router-dom";

const DisplaySingleCart = ({ item }) => {
    const { _id, title, desc, votes } = item;
    
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
        <h1 className="text-2xl font-bold">
          total-votes : {(votes === undefined) ? 'there are no votes' : ((votes.yesVotes || 0) + (votes.noVotes || 0))} 
        </h1>
        <div className="flex justify-between gap-4">
          <Link to={`/surveyDetails/${_id}`} className="btn btn-error">Survey Report</Link>
          <Link to={`/surveyDetails/${_id}`} className="btn btn-primary">Survey Details</Link>
        </div>
      </div>
    </div>
  );
};

export default DisplaySingleCart;
