import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hook/useAxiosCommon";

const PaymentList = () => {
  const axiosCommon = useAxiosCommon();
  const { data: paymentData = [] } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosCommon.get("/payment");
      return res.data;
    },
  });
  console.log(paymentData);

  return (
    <div>
      <h1 className="text-5xl font-bold text-center my-4">
        Total Payment {paymentData.length}
      </h1>
      <div className="overflow-x-auto mx-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>email</th>
              <th>transaction Id</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {
                paymentData.map((item, idx) => <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{item.email}</td>
                <td>{item.transactionId}</td>
                <td>{item.date}</td>
              </tr>)
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentList;
