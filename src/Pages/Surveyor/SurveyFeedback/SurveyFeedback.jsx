import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useAxiosCommon from "../../../hook/useAxiosCommon";

const SurveyFeedback = () => {
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();

  const { data: report = [] } = useQuery({
    queryKey: ["report", user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/feedback?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  if (!report.feedback || !Array.isArray(report.feedback)) {
    //console.error("Voting data is not an array or is undefined");
    return;
  }

  if (!report.findSurvey || !Array.isArray(report.findSurvey)) {
    //console.error("Survey data is not an array or is undefined");
    return;
  }

  const combinedData = report.feedback.map((feedbackItem, index) => {
    const surveyItem = report.findSurvey[index] || {};
    return { ...feedbackItem, ...surveyItem };
  });

  //console.log(combinedData);
  return (
    <div>
      <h1 className="text-center text-5xl font-bold my-4">
        Your survey Reported {combinedData.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>FeedBack info</th>
              <th>Admin Email</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {combinedData.map((item, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{item.question}</td>
                <td>{item.feedback}</td>
                <td>{item.feedbackBy}</td>
                <td>{item.status}</td>
              </tr>
            )) || <tr>No Feedback From Admin</tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyFeedback;
