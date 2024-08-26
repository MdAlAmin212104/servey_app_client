import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";


const usePaymentData = () => {
    const axiosCommon = useAxiosCommon();
    const { data: paymentData = [] } = useQuery({
        queryKey: ["payment"],
        queryFn: async () => {
          const res = await axiosCommon.get("/payment");
          return res.data;
        },
    });


    return [paymentData];
};

export default usePaymentData;