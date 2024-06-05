import useSurveyDate from "../../../hook/useSurveyDate";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosCommon from "../../../hook/useAxiosCommon";
import Swal from "sweetalert2";

const SurveyCart = () => {
  const [surveyData] = useSurveyDate();
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();

  const handleReport = (e, itemId) => {
    e.preventDefault();
    const surveyInfo = {
      id: itemId,
      title: titleInput,
      desc: descInput,
      reporterEmail: user?.email,
    };
    axiosCommon.post("/report", surveyInfo)
        .then((res) => {
            if (res.data.insertedId) {
                Swal.fire("Report submitted successfully");
                const modal = document.getElementById(`my_modal_${itemId}`);
                if (modal) {
                modal.close();
                }
                setTitleInput('');
                setDescInput('');
            }
        });
  };

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 my-8">
      {surveyData.map((item) => (
        <div key={item._id} className="card bg-base-100 shadow-xl">
          <dialog id={`my_modal_${item._id}`} className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <form
                onSubmit={(e) => handleReport(e, item._id)}
                className="card-body"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    placeholder="Title"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    value={descInput}
                    onChange={(e) => setDescInput(e.target.value)}
                    placeholder="Description"
                    className="textarea textarea-bordered textarea-md w-full"
                  ></textarea>
                </div>
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </dialog>
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <p>{item.desc}</p>
            <h1 className="text-2xl font-bold">
              total-votes :{" "}
              {item.votes === undefined
                ? "there are no votes"
                : (item.votes.yesVotes || 0) + (item.votes.noVotes || 0)}
            </h1>
            <div className="flex justify-between gap-4">
              <button
                onClick={() =>
                  document.getElementById(`my_modal_${item._id}`).showModal()
                }
                className="btn btn-error"
              >
                Survey Report
              </button>
              <Link
                to={`/surveyDetails/${item._id}`}
                className="btn btn-primary"
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
