import { useState } from "react";
import { MdDelete } from "react-icons/md";
import useUser from "../../../hook/useUser";
import useAxiosCommon from "../../../hook/useAxiosCommon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UserFilter from "../../../Components/UserFilter/UserFilter";

const ManageUser = () => {
  const [user, refetch] = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();


  
  // user update role
  const handleClick = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    document.getElementById("my_modal_5").showModal();
  };



  // selected role update
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  // user update role
  const handleUpdateRole = () => {
    const updatedUser = {
      ...selectedUser,
      role: selectedRole,
    };
    //console.log(updatedUser);
    axiosCommon
      .put("/updateUserRole", updatedUser)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("you user role has been updated");
          navigate("/dashboard/AdminHome");
        }
      })
      .catch((error) => console.error(error));
    document.getElementById("my_modal_5").close();
  };


  // user delete 
  const handleDelete = (id) => {
    axiosCommon
      .delete(`/user/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire("user deleted");
          refetch();
        }
      })
      .catch((err) => console.error(err));
  };

  

  return (
    <div>
      <h1 className="text-5xl font-bold text-center my-4">
        Total Users {user.length}
      </h1>
      <UserFilter/>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to update user role?
          </h3>
          <p className="py-4">
            <select
              className="select select-bordered w-full max-w-xs"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value={selectedRole}>{selectedRole}</option>
              <option value="admin">admin</option>
              <option value="user">user</option>
              <option value="pro-user">pro-user</option>
              <option value="surveyor">surveyor</option>
            </select>
          </p>
          <div>
            <button onClick={handleUpdateRole} className="btn btn-success">
              Update role
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Role</th>
              <th>Update role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleClick(user)}
                  >
                    Update role
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-ghost "
                  >
                    <MdDelete className="text-3xl" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
