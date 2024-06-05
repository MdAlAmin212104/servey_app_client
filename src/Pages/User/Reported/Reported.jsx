import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useAxiosCommon from "../../../hook/useAxiosCommon";

const Reported = () => {
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();

  const { data: report = [] } = useQuery({
    queryKey: ["report", user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/report?email=${user?.email}`);
      return res.data;
    },
  });

  if (!report.report || !Array.isArray(report.report)) {
    console.error("Voting data is not an array or is undefined");
    return;
  }

  if (!report.survey || !Array.isArray(report.survey)) {
    console.error("Survey data is not an array or is undefined");
    return;
  }

  const combinedData = report.report.map((reportItem, index) => {
    const surveyItem = report.survey[index] || {};
    return { ...reportItem, ...surveyItem };
  });


  return (
    <div>
      <h1 className="text-5xl text-center text-red-400 font-bold">
        Total Reporting {report.report.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>Description</th>
              <th>Category</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {
                combinedData.map((item, idx) => (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>{item.title}</td>
                    <td>{item.desc}</td>
                    <td>{item.category}</td>
                    <td>{item.status}</td>
                  </tr>
                )) || <tr>No Data</tr>
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reported;
