import React, { useState } from "react";
import Header from "../comps/Header";
import CountUp from 'react-countup';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";

function Card(props) {
  return (

    <Link to={"/contacts"} className="card w-[205px] h-[100px] flex flex-col justify-center items-star overflow-hidden" data-aos="fade-up" data-aos-delay={props.delay}>
      <h2 className=" font-bold capitalize">{props.title}</h2>
      <p className="text-sm text-gray-500"><span className="text-2xl font-bold"><CountUp end={props.description} duration={3} /></span> Entries</p>
    </Link>
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
        <Header link="/signup" btnText="Add New" title="Dashboard"/>
        <div className="pt-4 flex flex-wrap gap-4 items-center justify-center">
          {data.map((item, index) => (
            <Card 
              delay={index * 100}
              key={item.website}
              title={item.website} 
              description={item.numOfEntries} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
