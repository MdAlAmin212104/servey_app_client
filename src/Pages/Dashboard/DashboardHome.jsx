import useAuth from "../../hook/useAuth";
import usePaymentData from "../../hook/usePaymentData";
import useSurvey from "../../hook/useSurvey";
import useSurveyCount from "../../hook/useSurveyCount";
import useUser from "../../hook/useUser";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const DashboardHome = () => {
  const { user } = useAuth();
  const [user1] = useUser();
  const [paymentData] = usePaymentData();
  const [survey] = useSurvey("");
  const { surveyCount } = useSurveyCount();
  function getFormattedDate() {
    const date = new Date();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];

    // Determine the ordinal suffix
    let suffix;
    if (day > 3 && day < 21) {
      suffix = "th";
    } else {
      switch (day % 10) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
        default:
          suffix = "th";
          break;
      }
    }

    return `${month} ${day}${suffix}`;
  }

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const data = [
    {
      name: "Customer_Satisfaction",
      uv: surveyCount.Customer_Satisfaction,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Product_Review",
      uv: surveyCount.Product_Review,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Employee_Feedback",
      uv: surveyCount.Employee_Feedback,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "All",
      uv: surveyCount.All,
      pv: 3908,
      amt: 2000,
    },
  ];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  console.log(surveyCount);

  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
        Hi, {user.displayName}
      </h1>
      <div className="stats stats-vertical lg:stats-horizontal shadow my-6 w-full">
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

    <ResponsiveContainer width='100%' height={300}>
    <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
          dataKey="uv"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default DashboardHome;
