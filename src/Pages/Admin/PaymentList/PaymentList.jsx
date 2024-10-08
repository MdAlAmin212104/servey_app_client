import usePaymentData from "../../../hook/usePaymentData";

const PaymentList = () => {
  const [paymentData] = usePaymentData();

  return (
    <div>
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
