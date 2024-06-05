import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";
import { useContext} from "react";
import { UserRoleContext } from "../Components/FilterRole/FilterRole";

const useUser = () => {
    const { role } = useContext(UserRoleContext);
    //console.log(role);
    const axiosCommon = useAxiosCommon();

    const { data : users = [], refetch } = useQuery({
        queryKey : ['users', role],
        queryFn : async () => {
            const res = await axiosCommon.get(`/users?role=${role}`);
            console.log(res.data);
            return res.data;
        }
    })
    return [users, refetch];
};

export default useUser;