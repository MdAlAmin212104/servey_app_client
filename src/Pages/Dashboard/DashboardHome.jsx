import useAuth from "../../hook/useAuth";
import usePaymentData from "../../hook/usePaymentData";
import useSurvey from "../../hook/useSurvey";
import useUser from "../../hook/useUser";

const DashboardHome = () => {
  const { user } = useAuth();
  const [user1] = useUser();
  const [paymentData] = usePaymentData();
  const [survey] = useSurvey("");
  console.log(user1.length, paymentData.length, survey.length);
  function getFormattedDate() {
    const date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];

    // Determine the ordinal suffix
    let suffix;
    if (day > 3 && day < 21) {
        suffix = "th";
    } else {
        switch (day % 10) {
            case 1: suffix = "st"; break;
            case 2: suffix = "nd"; break;
            case 3: suffix = "rd"; break;
            default: suffix = "th"; break;
        }
    }

    return `${month} ${day}${suffix}`;
}
  return (
    <div>
      <h1 className="text-4xl font-bold">Hi, {user.displayName}</h1>
      <div className="stats stats-vertical lg:stats-horizontal shadow my-6">
        <div className="stat">
          <div className="stat-title">Total User</div>
          <div className="stat-value">{user1.length}</div>
          <div className="stat-desc">Jun 1st - {getFormattedDate()}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Survey List</div>
          <div className="stat-value">{survey.length}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">Success To Payment</div>
          <div className="stat-value">{paymentData.length}</div>
          <div className="stat-desc">↗︎ 90 (54%)</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
