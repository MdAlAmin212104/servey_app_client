
import { Link } from "react-router-dom";

const PriceTable = () => {
  return (
    <div className="grid md:grid-cols-3 gap-4 my-6">
      <Link to="/payment">
        <div className="card bg-base-100 shadow-xl pb-8 transform transition-transform duration-300 hover:scale-105">
          <h1 className="bg-blue-600 text-center p-4 text-white font-bold text-4xl">BASIC</h1>
          <h2 className="text-3xl font-bold text-center mt-4">$24/month</h2>
          <p className="mt-4 text-center "> <b>1000</b> votes</p>
          <p className="mt-4 text-center "> <b>500</b> comments</p>
          <p className="mt-4 text-center "> <b>Unlimited</b> support</p>
          <p className="mt-4 text-center "> <b>Time tracking</b></p>
          <button className="btn btn-success w-2/4 mx-auto mt-5">Payment Now</button>
        </div>
      </Link>
      <Link to="/payment">
        <div className="card bg-base-100 shadow-xl pb-8 transform transition-transform duration-300 hover:scale-105">
          <h1 className="bg-blue-600 text-center p-4 text-white font-bold text-4xl">PROFESSIONAL</h1>
          <h2 className="text-3xl font-bold text-center mt-4">$99/month</h2>
          <p className="mt-4 text-center "> <b>5000</b> votes</p>
          <p className="mt-4 text-center "> <b>2000</b> comments</p>
          <p className="mt-4 text-center "> <b>Unlimited</b> support</p>
          <p className="mt-4 text-center "> <b>Time tracking</b></p>
          <button className="btn btn-success w-2/4 mx-auto mt-5">Payment Now</button>
        </div>
      </Link>
      <Link to="/payment">
        <div className="card bg-base-100 shadow-xl pb-8 transform transition-transform duration-300 hover:scale-105">
          <h1 className="bg-blue-600 text-center p-4 text-white font-bold text-4xl">ENTERPRISE</h1>
          <h2 className="text-3xl font-bold text-center mt-4">$200/month</h2>
          <p className="mt-4 text-center "> <b>Unlimited</b> votes</p>
          <p className="mt-4 text-center "> <b>Unlimited</b> comments</p>
          <p className="mt-4 text-center "> <b>Unlimited</b> support</p>
          <p className="mt-4 text-center "> <b>Time tracking</b></p>
          <button className="btn btn-success w-2/4 mx-auto mt-5">Payment Now</button>
        </div>
      </Link>
    </div>
  );
};

export default PriceTable;
