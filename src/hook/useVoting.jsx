import { useQuery } from "@tanstack/react-query";
import useAxiosNotSecure from "./useAxiosNotSecure";

const useVoting = (id) => {
    const axiosNotSecure = useAxiosNotSecure()

    const { data : votingResult = []} =useQuery({
        queryKey : ['votingResult', id],
        queryFn : async ( ) => {
            const res = await axiosNotSecure.get(`/voting?survey_id=${id}`);
            //console.log(res.data);
            return res.data;
        }

    })


    return votingResult;
};

export default useVoting;