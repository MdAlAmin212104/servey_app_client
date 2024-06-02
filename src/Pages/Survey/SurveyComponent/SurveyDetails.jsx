
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const SurveyDetails = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const survey = useLoaderData();
    const { title, category, question, date, desc, surveyEmail, options, timestamp } = survey;
  

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setIsButtonDisabled(false);
    };

    const handleSubmit = () => {
        // Implement the submit logic here
        console.log(`Submitted Value: ${selectedValue}`);
    };



  
  return (
    <div className="my-8">
      <h1 className="md:text-5xl font-bold text-center">{title}</h1>
      <p className="md:w-2/3 mx-auto mt-4 text-center">{desc}</p>
      
      <div className="md:flex justify-around text-center">
        <p className="mt-4">Create the survey : {timestamp}</p>
        <p className="mt-4">Survey Email : {surveyEmail}</p>
        <p className="mt-4">limitation : {date}</p>
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
          <button onClick={handleSubmit} disabled={isButtonDisabled} className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default SurveyDetails;
