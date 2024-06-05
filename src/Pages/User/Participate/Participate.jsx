import useUserVoting from "../../../hook/useUserVoting";

const Participate = () => {
  const [participate] = useUserVoting()

  //const survey = participate.survey;
  console.log(participate);
  if (!participate.voting || !Array.isArray(participate.voting)) {
    console.error('Voting data is not an array or is undefined');
    return;
  }

  if (!participate.survey || !Array.isArray(participate.survey)) {
    console.error('Survey data is not an array or is undefined');
    return;
  }

const combinedData = participate.voting.map((votingItem, index) => {
    const surveyItem = participate.survey[index] || {}; 
    return { ...votingItem, ...surveyItem };
  });

  return (
    <div>
      <h1 className="my-4 text-5xl font-bold text-center">
        Participate in Survey {participate.survey.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>SurveyEmail</th>
              <th>Category</th>
              <th>Status</th>
              <th>My Votes</th>
            </tr>
          </thead>
          <tbody>
          {
            combinedData.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.question}</td>
                  <td>{item.surveyEmail}</td>
                  <td>{item.category}</td>
                  <td>{item.status}</td>
                  <td>{item.voting ? 'Yes': 'No'}</td>
                </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Participate;
