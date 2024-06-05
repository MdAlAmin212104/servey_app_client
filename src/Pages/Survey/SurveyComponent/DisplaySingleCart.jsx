import { Link } from "react-router-dom";

const DisplaySingleCart = ({ item }) => {
  const { _id, title, desc, votes } = item;

  const handleReport = e => {
    e.preventDefault();
    console.log("button clicked");
    //console.log(id);
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleReport} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea placeholder="Description" name="desc" className="textarea textarea-bordered textarea-md w-full" ></textarea>
            </div>
            <div className="form-control mt-6">
              {/* <input type="submit" className="btn btn-primary">Submit</input> */}
              <input type="submit" className="btn btn-primary" value="Submit" />
            </div>
          </form>
        </div>
      </dialog>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
        <h1 className="text-2xl font-bold">
          total-votes :{" "}
          {votes === undefined
            ? "there are no votes"
            : (votes.yesVotes || 0) + (votes.noVotes || 0)}
        </h1>
        <div className="flex justify-between gap-4">
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="btn btn-error"
          >
            Survey Report
          </button>
          <Link to={`/surveyDetails/${_id}`} className="btn btn-primary">
            Survey Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DisplaySingleCart;
