import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useVoting = (id) => {
    const axiosCommon = useAxiosCommon()

    const { data : votingResult = []} =useQuery({
        queryKey : ['votingResult', id],
        queryFn : async ( ) => {
            const res = await axiosCommon.get(`/voting?survey_id=${id}`);
            //console.log(res.data);
            return res.data;
        }

    })


    return votingResult;
};

export default useVoting;