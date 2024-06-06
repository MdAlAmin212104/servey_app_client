import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosCommon from "../../../hook/useAxiosCommon";
import useAuth from "../../../hook/useAuth";
import useVoting from "../../../hook/useVoting";
import Swal from "sweetalert2";
import useProUser from "../../../hook/useProUser";

const SurveyDetails = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isButtonSubmitted, setIsButtonSubmitted] = useState(false);
  const [yesVotes, setYesVotes] = useState(0);
  const [noVotes, setNoVotes] = useState(0);
  const survey = useLoaderData();
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isProUser] = useProUser();
  const {
    _id,
    title,
    category,
    question,
    date,
    desc,
    surveyEmail,
    options,
    timestamp,
    votes,
  } = survey;
  const initialYesVotes = votes?.yesVotes || 0;
  const initialNoVotes = votes?.noVotes || 0;
  const axiosCommon = useAxiosCommon();
  const votingResult = useVoting(_id);
  const navigate = useNavigate();

  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (votingResult.length > 0 && user) {
      const hasVoted = votingResult.some(
        (element) => element.email === user.email
      );
      if (hasVoted) {
        setIsButtonSubmitted(true);
      }
    }

    // Initialize the vote counts from the survey data
    if (isButtonSubmitted) {
      setYesVotes(initialYesVotes);
      setNoVotes(initialNoVotes);
    }
  }, [votingResult, user, initialYesVotes, initialNoVotes, isButtonSubmitted]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setIsButtonDisabled(false);
  };

  const handleSubmit = () => {
    let value = {
      selectedValue: selectedValue == 0,
    };
    if (!user) {
      return navigate("/login");
    }

    const votingInfo = {
      survey_id: _id,
      email: user?.email,
      name: user.displayName,
      voting: value.selectedValue,
    };

    // Submit the vote to the database
    axiosCommon
      .post("/voting", votingInfo)
      .then((res) => {
        if (res.data.surveyUpdate.modifiedCount > 0) {
          setIsButtonSubmitted(true);
        }
        //console.log(res.data);
      })
      .catch((error) => {
        console.error("Error submitting vote:", error);
      });
  };

  const handleComments = (e, itemId)=>{
    e.preventDefault();
    const commentInfo = {
      survey_id : itemId,
      comment: descInput,
      commentEmail: user?.email,
    }
    console.log(commentInfo);
    axiosCommon.post("/comment", commentInfo)
      .then(res => {
        console.log(res.data);
        if(res.data.insertedId){
          Swal.fire("Comment submitted successfully");
          setDescInput("");
          setIsCommentsModalOpen(false)
        }

      })
    
  }

  const handleReport = (e, itemId) => {
    e.preventDefault();
    const surveyInfo = {
      id: itemId,
      title: titleInput,
      desc: descInput,
      reporterEmail: user?.email,
    };
    console.log(surveyInfo);
    axiosCommon.post("/report", surveyInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire("Report submitted successfully");
        const modal = document.getElementById(`my_modal_${itemId}`);
        if (modal) {
          modal.close();
        }
        setTitleInput("");
        setDescInput("");
      }
    });
  };

  return (
    <div className="my-8">
      <h1 className="md:text-5xl font-bold text-center">{title}</h1>
      <p className="md:w-2/3 mx-auto mt-4 text-center">{desc}</p>

      <div className="md:flex justify-around text-center">
        <p className="mt-4">Create the survey : {timestamp}</p>
        <p className="mt-4">Survey Email : {surveyEmail}</p>
        <p className="mt-4">Limitation : {date}</p>
      </div>
      <div className="card md:w-96 bg-base-100 shadow-xl mt-8">
        <div className="card-body">
          <h2 className="card-title">{category}</h2>
          <p>{question}</p>
          {options.map((item, idx) => (
            <h1 key={idx}>
              <input
                onChange={handleChange}
                type="radio"
                name="radio"
                value={idx}
              />{" "}
              {item}{" "}
            </h1>
          ))}
          <button
            onClick={handleSubmit}
            disabled={isButtonDisabled || isButtonSubmitted}
            className="btn btn-success"
          >
            {isButtonSubmitted ? "submitted" : "submit"}
          </button>
          <div className="mt-4">
            <p>Yes Votes: {yesVotes}</p>
            <p>No Votes: {noVotes}</p>
          </div>
          <div className="card-actions justify-end">
          {isProUser && <button onClick={() => setIsCommentsModalOpen(true)} className="btn btn-primary">Comments</button>}
            <button
              onClick={() =>
                document.getElementById(`my_modal_${_id}`).showModal()
              }
              className="btn btn-error"
            >
              Survey Report
            </button>
          </div>
        </div>
      </div>
      {/* Comments Modal */}
      {isCommentsModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setIsCommentsModalOpen(false)}
              >
                ✕
              </button>
            </form>
            <form onSubmit={(e) => handleComments(e, _id)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Comment</span>
              </label>
              <textarea
                value={descInput}
                onChange={(e) => setDescInput(e.target.value)}
                placeholder="Description"
                className="textarea textarea-bordered textarea-md w-full"
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <input type="submit" className="btn btn-primary" value="Submit" />
            </div>
          </form>
          </div>
        </dialog>
      )}

      {/* Survey Report Modal */}
      <dialog id={`my_modal_${_id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={(e) => handleReport(e, _id)} className="card-body">
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
              <input type="submit" className="btn btn-primary" value="Submit" />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SurveyDetails;
