import React, { useState } from 'react'
import Header from '../comps/Header'
import TableData from "../comps/Table"


const Allcontacts = () => {

const [data, setData] = useState({
  domain: "Facebook.com",
  numOfEntries: 0,
});

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "age", headerName: "Age", width: 110 },
  { field: "email", headerName: "Email", width: 200 },
];

const generateUniqueData = (count) => {
  const uniqueData = [];

  for (let i = 1; i <= count; i++) {
    uniqueData.push({
      id: i,
      name: `User${i}`,
      age: Math.floor(Math.random() * 50) + 18, // Random age between 18-67
      email: `user${i}@example.com`
    });
  }

  return uniqueData;
};

const uniqueEntries = generateUniqueData(100);




  return (
    <div className='parent'>
      <div className='child'>
        <Header link="/dashboard" btnText="Dashboard" title={data.domain}/>

        <div className='mt-4 '>
        <TableData columns={columns} data={uniqueEntries} />
        </div>

        
      </div>
    </div>
  )
}

export default Allcontacts
