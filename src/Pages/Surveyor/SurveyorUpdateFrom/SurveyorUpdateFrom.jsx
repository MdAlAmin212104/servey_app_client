import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosCommon from "../../../hook/useAxiosCommon";
import Swal from "sweetalert2";


const SurveyorUpdateFrom = () => {
    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate()
    const survey = useLoaderData()
    console.log(survey);
    const { _id, title, category, question, date, desc } = survey;

    const handleUpdateSurvey = e => {
        e.preventDefault();
        const from = e.target;
        const title = from.title.value;
        const category = from.category.value;
        const question = from.question.value;
        const date = from.date.value;
        const desc = from.desc.value;
        
        const updateSurveyInformation = {
            title,
            category, 
            question, 
            date, 
            desc,
        }

        axiosCommon.patch(`/survey/${_id}`, updateSurveyInformation)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("this survey database Update success!");
                    navigate('/dashboard/surveyList')
                }
            })


    }
    return (
        <div className="hero bg-base-200">
      <div className="card shrink-0 w-full shadow-2xl bg-base-100">
      <h1 className="md:text-5xl text-2xl text-center font-bold mt-4">Create Survey Form Do you want</h1>
        <form onSubmit={handleUpdateSurvey} className="card-body grid md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              defaultValue={title}
              name="title"
              placeholder="Title"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select defaultValue={category} name="category" className="select select-bordered w-full">
            <option value="All">Select Category</option>
            <option value="Customer Satisfaction">Customer Satisfaction</option>
            <option value="Employee Feedback">Employee Feedback</option>
            <option value="Product Review">Product Review</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">QuestionText</span>
            </label>
            <input
              type="text"
              defaultValue={question}
              name="question"
              placeholder="Question"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">DateLine</span>
            </label>
            <input
              type="date"
              defaultValue={date}
              name="date"
              placeholder="Date Line"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control md:col-span-2">
            <textarea defaultValue={desc} placeholder="Description" name="desc" className="textarea textarea-bordered textarea-lg w-full min-h-[300px]" ></textarea>
          </div>
          
          <div className="form-control mt-6 md:col-span-2">
            <button className="btn btn-primary">update Survey</button>
          </div>
        </form>
      </div>
    </div>
    );
};

export default SurveyorUpdateFrom;