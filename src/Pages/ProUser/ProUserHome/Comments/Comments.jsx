import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hook/useAuth";
import useAxiosCommon from "../../../../hook/useAxiosCommon";

const Comments = () => {
    const axiosCommon = useAxiosCommon();
  const { user } = useAuth();

  const { data: report = [] } = useQuery({
    queryKey: ["report", user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/comment?email=${user?.email}`);
      return res.data;
    },
  });

  if (!report.comment || !Array.isArray(report.comment)) {
    console.error("Voting data is not an array or is undefined");
    return;
  }

  if (!report.survey || !Array.isArray(report.survey)) {
    console.error("Survey data is not an array or is undefined");
    return;
  }

  const combinedData = report.comment.map((commentItem, index) => {
    const surveyItem = report.survey[index] || {};
    return { ...commentItem, ...surveyItem };
  });
    console.log(combinedData);


    return (
        <div>
            <h1 className="text-5xl text-center my-4 font-bold">total Comment { combinedData.length}</h1>
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
              <th>Your Comment</th>
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
                  <td>{item.comment}</td>
                </tr>
            ))
          }
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default Comments;