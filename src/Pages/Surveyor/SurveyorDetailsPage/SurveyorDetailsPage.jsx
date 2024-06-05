import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import useAxiosCommon from "../../../hook/useAxiosCommon";

const SurveyorDetailsPage = () => {
  const surveyDetailsPage = useLoaderData();
  const axiosCommon = useAxiosCommon();
  const id = surveyDetailsPage._id;

  const { data: voting = [] } = useQuery({
    queryKey: ["voting", id],
    queryFn: async () => {
      const res = await axiosCommon.get(`/voting?survey_id=${id}`);
      //console.log(res.data);
      return res.data;
    },
  });

  console.log(voting);

  return (
    <div>
      <h1 className="text-5xl text-center font-bold my-4">
        Total voting {voting.length}
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
                voting.map((item, idx) => <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>{item.email}</td>
                    <td>{item.name}</td>
                    <td>
                        {
                            (item.voting) ? 'Yes' : 'No'
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
