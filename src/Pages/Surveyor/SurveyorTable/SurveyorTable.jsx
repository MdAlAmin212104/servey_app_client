
import useAxiosCommon from "../../../hook/useAxiosCommon";
import update from '../../../assets/update.png'
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useSurvey from "../../../hook/useSurvey";

const SurveyorTable = () => {
  const axiosCommon = useAxiosCommon();
  const [ survey, refetch] = useSurvey();



  
  const handleDelete = (id) => {
    axiosCommon.delete(`/survey/${id}`)
      .then(res => {
        if(res.data.deletedCount > 0){
          Swal.fire('survey deleted')
          refetch()
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h1 className="text-3xl text-center my-4 font-bold">
        Your total Survey : {survey.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>question</th>
              <th>Details</th>
              <th>DateLink</th>
              <th>update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
                survey.map((item, idx) => <tr key={idx}>
                <th>{idx+1}</th>
                <td>{item.question}</td>
                <td><button className="btn btn-sm"><Link to={`/dashboard/surveyor/surveys/${item._id}`}>Details</Link> </button></td>
                <td>{item.date}</td>
                <td>
                  <Link to={`/dashboard/surveyUpdate/${item._id}`}><img src={update}  className="w-10"/></Link>
                </td>
                <td><button onClick={()=>handleDelete(item._id)}><MdDelete className="text-3xl"/></button></td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyorTable;
