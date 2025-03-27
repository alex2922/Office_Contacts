import React from "react";
import Header from "../comps/Header";

function Card(props) {
  return (
    <div className="card ">
      <h2 className="text-2xl font-bold">{props.title}</h2>
      <p className="text-sm text-gray-500">{props.description}</p>
    </div>
  );
}




const Dashboard = () => {


    const [data, setData] = useState([
        {
            website: "google.com",
            numOfEntries: 100,
        },
        {
            website: "facebook.com",
            numOfEntries: 20,
        },
        {
            website: "instagram.com",
            numOfEntries: 300,
        },
        {
            website: "apple.com",
            numOfEntries: 400,
        },
        
    ])



  return (
    <div className="parent">
      <div className="child">
        <Header />
        <div className="pt-4 flex flex-wrap gap-4">
          {data.map((item) => (
            <Card title={item.website} description={item.numOfEntries} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
