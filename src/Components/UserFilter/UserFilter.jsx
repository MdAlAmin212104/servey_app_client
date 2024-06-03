import { useContext } from "react";
import { UserRoleContext } from "../FilterRole/FilterRole";


const UserFilter = () => {
    const { setRole } = useContext(UserRoleContext)

    const handleRoleFilterChange = (event) => {
        const role = event.target.value;
        setRole(role);
        
      };
    return (
        <div>
            <h1 className="text-2xl font-bold my-4">Filter by user role</h1>
            <select
            className="select select-bordered w-full max-w-xs"
            onChange={handleRoleFilterChange}
            >
            <option value="">All users</option>
            <option value="user">User</option>
            <option value="pro-user">Pro-user</option>
            <option value="surveyor">Surveyor</option>
            <option value="admin">Admin</option>
            </select>
        </div>
    );
};

export default UserFilter;