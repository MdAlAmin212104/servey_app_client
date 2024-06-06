import { useState } from "react";
import useSurveyDate from "../../../hook/useSurveyDate";
import { Link } from "react-router-dom";

const SurveyCart = () => {
  const [surveyData] = useSurveyDate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredSurveyData =
    selectedCategory === "All"
      ? surveyData
      : surveyData.filter((item) => item.category === selectedCategory);

  const sortedSurveyData = filteredSurveyData.sort((a, b) => {
    const totalVotesA = (a.votes?.yesVotes || 0) + (a.votes?.noVotes || 0);
    const totalVotesB = (b.votes?.yesVotes || 0) + (b.votes?.noVotes || 0);
    return sortOrder === "desc"
      ? totalVotesB - totalVotesA
      : totalVotesA - totalVotesB;
  });

  return (
    <>
      <div className="md:flex justify-between">
        <div className="form-control w-1/4">
          <label className="label">
            <span className="label-text">Filter By Category</span>
          </label>
          <select
            name="category"
            className="select select-bordered w-full"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="All">Select Category</option>
            <option value="Customer Satisfaction">Customer Satisfaction</option>
            <option value="Employee Feedback">Employee Feedback</option>
            <option value="Product Review">Product Review</option>
          </select>
        </div>

        <div className="form-control w-1/4">
          <label className="label">
            <span className="label-text">Sort by Total Votes</span>
          </label>
          <select
            name="sortOrder"
            className="select select-bordered w-full"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 my-8">
        {sortedSurveyData.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.desc}</p>
              <h1 className="text-2xl font-bold">
                Total Votes:{" "}
                {item.votes === undefined
                  ? "There are no votes"
                  : (item.votes.yesVotes || 0) + (item.votes.noVotes || 0)}
              </h1>
              <div className="card-actions justify-end">
                <Link to={`/surveyDetails/${item._id}`} className="btn">
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

export default SurveyCart;
