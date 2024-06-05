import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosCommon from "../../../hook/useAxiosCommon";
import useAuth from "../../../hook/useAuth";
import useVoting from "../../../hook/useVoting";

const SurveyDetails = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isButtonSubmitted, setIsButtonSubmitted] = useState(false);
  const [yesVotes, setYesVotes] = useState(0);
  const [noVotes, setNoVotes] = useState(0);
  const survey = useLoaderData();
  const { _id, title, category, question, date, desc, surveyEmail, options, timestamp, votes } = survey;
  const initialYesVotes = votes?.yesVotes || 0;
  const initialNoVotes = votes?.noVotes || 0;
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const votingResult = useVoting(_id);

  useEffect(() => {
    if (votingResult.length > 0 && user) {
      const hasVoted = votingResult.some(element => element.email === user.email);
      if (hasVoted) {
        setIsButtonSubmitted(true);
      }
    }
    
    // Initialize the vote counts from the survey data
    if(isButtonSubmitted){
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
      selectedValue: selectedValue == 0
    };

    const votingInfo = {
      survey_id: _id,
      email: user?.email,
      name: user.displayName,
      voting: value.selectedValue,
    };

    // Submit the vote to the database
    axiosCommon.post('/voting', votingInfo)
      .then(res => {
        if (res.data.surveyUpdate.modifiedCount > 0) {
          setIsButtonSubmitted(true);
        }
        //console.log(res.data);
      })
      .catch(error => {
        console.error("Error submitting vote:", error);
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
          {
            options.map((item, idx) => (
              <h1 key={idx}><input onChange={handleChange} type="radio" name="radio" value={idx} /> {item} </h1>
            ))
          }
          <button onClick={handleSubmit} disabled={isButtonDisabled || isButtonSubmitted} className="btn btn-success">
            {isButtonSubmitted ? 'submitted' : 'submit'}
          </button>
          <div className="mt-4">
            <p>Yes Votes: {yesVotes}</p>
            <p>No Votes: {noVotes}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SurveyDetails;
