import useSurvey from "../../../hook/useSurvey";

const SurveyList = () => {
  const [survey] = useSurvey();
  console.log(survey);
  return (
    <div>
      <h1 className="text-5xl text-center font-bold my-4">
        Total Survey {survey.length}
      </h1>
      <div className="overflow-x-auto mx-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Surveyor Email</th>
              <th>category</th>
              <th>status</th>
              <th>Crate Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {
                survey.map((item, idx) => {
                  return (
                    <tr key={item._id}>
                      <td>{idx + 1}</td>
                      <td>{item.surveyEmail}</td>
                      <td>{item.category}</td>
                      <td>{item.status}</td>
                      <td>{item.timestamp}</td>
                      <td>{item.date}</td>
                    </tr>
                  );
                })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyList;
