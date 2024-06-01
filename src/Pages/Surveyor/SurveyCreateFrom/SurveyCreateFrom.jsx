import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import useAxiosCommon from "../../../hook/useAxiosCommon";

const SurveyCreateFrom = () => {
    const { user }= useAuth();
    const axiosCommon = useAxiosCommon();


    const handleCreateSurvey = e => {
        e.preventDefault();
        const from = e.target;
        const title = from.title.value;
        const category = from.category.value;
        const question = from.question.value;
        const date = from.date.value;
        const desc = from.desc.value;
        const surveyEmail = user?.email;
        const PresentDate = new Date().getDate();
        const month = (new Date().getMonth()+1);
        const year = new Date().getFullYear();
        let timestamp =`${year}-${month}-${PresentDate}`
        const formattedDeadline = timestamp.split('-').map(part => part.padStart(2, '0')).join('-');
        const surveyInformation = {
            title,
            category, 
            question, 
            date, 
            desc, 
            surveyEmail,
            options: ['Yes', 'No'],
            status: 'publish',
            timestamp : formattedDeadline,

        }
        axiosCommon.post('/survey', surveyInformation)
            .then(res => {
                if(res.data.insertedId){
                    Swal.fire('survey information inserted')
                    from.reset()
                }
            })
            .catch(err => console.log(err))
    }
  return (
    <div className="hero bg-base-200">
      <div className="card shrink-0 w-full shadow-2xl bg-base-100">
      <h1 className="md:text-5xl text-2xl text-center font-bold mt-4">Create Survey Form Do you want</h1>
        <form onSubmit={handleCreateSurvey} className="card-body grid md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
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
            <select name="category" className="select select-bordered w-full">
            <option selected value="All">Select Category</option>
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
              name="date"
              placeholder="Date Line"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control md:col-span-2">
            <textarea placeholder="Description" name="desc" className="textarea textarea-bordered textarea-lg w-full min-h-[300px]" ></textarea>
          </div>
          
          <div className="form-control mt-6 md:col-span-2">
            <button className="btn btn-primary">Create Survey</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyCreateFrom;
