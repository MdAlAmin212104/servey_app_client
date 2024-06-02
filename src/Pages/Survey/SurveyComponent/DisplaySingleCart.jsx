import { Link } from "react-router-dom";

const DisplaySingleCart = ({ item }) => {
    const { _id, title, desc } = item;
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
        <div className="card-actions justify-end">
          <Link to={`/surveyDetails/${_id}`} className="btn btn-primary">Survey Details</Link>
        </div>
      </div>
    </div>
  );
};

export default DisplaySingleCart;
