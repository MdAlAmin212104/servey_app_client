import { useState } from "react";
import useSurvey from "../../../hook/useSurvey";
import useAuth from "../../../hook/useAuth";
import useAxiosCommon from "../../../hook/useAxiosCommon";
import Swal from "sweetalert2";

const SurveyList = () => {
  const [survey, refetch] = useSurvey("");
  const [descInput, setDescInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const { user }=useAuth()
  const axiosCommon = useAxiosCommon();

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(selectedSurveyId, "item clicked");
    // console.log(descInput);
    const feedback = {
      survey_id : selectedSurveyId._id,
      feedback : descInput,
      feedbackBy : user?.email,
      surveyEmail : selectedSurveyId.surveyEmail,
    }
    //console.log(feedback);
    axiosCommon.post('/feedback', feedback)
      .then(res => {
        //console.log(res.data);
        if (res.data.insertedId) {
          axiosCommon.patch(`/statusUpdate/${selectedSurveyId._id}`)
            .then(res => {
              if (res.data.modifiedCount > 0) {
                Swal.fire("Feedback submitted successfully");
                setDescInput('');
                document.getElementById(`my_modal_${selectedSurveyId._id}`).close();
                refetch();
              }
            })
        }
      })
  };

  const openModal = (itemId) => {
    setSelectedSurveyId(itemId);
    document.getElementById(`my_modal_${itemId._id}`).showModal();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredSurveyData =
    selectedCategory === "All"
      ? survey
      : survey.filter((item) => item.status === selectedCategory);

  return (
    <div>
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
            <option value="publish">publish</option>
            <option value="unpublished">unPublish</option>
            
          </select>
      </div>

      {survey.map((item) => (
        <dialog key={item._id} id={`my_modal_${item._id}`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleClick} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Comment</span>
                </label>
                <textarea
                  value={descInput}
                  onChange={(e) => setDescInput(e.target.value)}
                  placeholder="Description"
                  className="textarea textarea-bordered textarea-md w-full"
                  required
                ></textarea>
              </div>
              <div className="form-control mt-6">
                <input type="submit" className="btn btn-primary" value="Submit" />
              </div>
            </form>
          </div>
        </dialog>
      ))}

      <div className="overflow-x-auto mx-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Surveyor Email</th>
              <th>Category</th>
              <th>Status</th>
              <th>Create Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSurveyData.map((item, idx) => {
              return (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td>{item.surveyEmail}</td>
                  <td>{item.category}</td>
                  <td>
                    <button
                      onClick={() => openModal(item)}
                      className="btn btn-sm"
                    >
                      {item.status}
                    </button>
                  </td>
                  <td>{item.timestamp}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyList;
