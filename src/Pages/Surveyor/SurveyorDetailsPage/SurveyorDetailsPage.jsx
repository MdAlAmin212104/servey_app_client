
import { useLoaderData } from "react-router-dom";
import useVoting from "../../../hook/useVoting";

const SurveyorDetailsPage = () => {
  const surveyDetailsPage = useLoaderData();
  const id = surveyDetailsPage._id;
  const votingResult = useVoting(id)

  return (
    <div>
      <h1 className="text-5xl text-center font-bold my-4">
        Total voting {votingResult.length}
      </h1>

      <div className="overflow-x-auto mx-6">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Name</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {
                votingResult.map((item, idx) => <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>{item.email}</td>
                    <td>{item.name}</td>
                    <td>
                        {
                            item.voting ? 'Yes' : 'No'
                        }
                    </td>
                </tr>)
            }
            
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyorDetailsPage;
