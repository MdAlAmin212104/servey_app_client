import { useLoaderData } from "react-router-dom";
import useVoting from "../../../hook/useVoting";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SurveyorDetailsPage = () => {
  const surveyDetailsPage = useLoaderData();
  const id = surveyDetailsPage._id;
  const votingResult = useVoting(id);
  const [showResults, setShowResults] = useState(false);

  const handleToggle = () => {
    setShowResults(!showResults);
  };

  const booleanCounts = { true: 0, false: 0 };
  votingResult.forEach((vote) => {
    booleanCounts[vote.voting] += 1;
  });

  const data = [
    { name: "True Votes", value: booleanCounts.true },
    { name: "False Votes", value: booleanCounts.false },
  ];

  return (
    <div>
      <h1 className="text-5xl text-center font-bold my-4">
        Total voting {votingResult.length}
      </h1>

      <button
        onClick={handleToggle}
        className="my-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {showResults ? "Hide Results" : "Show Results"}
      </button>

      {showResults ? (
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="overflow-x-auto mx-6">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Name</th>
                <th>Vote</th>
              </tr>
            </thead>
            <tbody>
              {votingResult.map((item, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{item.email}</td>
                  <td>{item.name}</td>
                  <td>{item.voting ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SurveyorDetailsPage;
