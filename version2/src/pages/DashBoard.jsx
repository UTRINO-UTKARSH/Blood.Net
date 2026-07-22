// import React, { useState,useEffect } from 'react'

// const Dashboard = () => {
//     const [category, setCategory] = useState("");

//     useEffect(() => {
//         const getUser = async ()=> {
//             try {
//                 const res = await fetch("http://localhost:3000/auth/providerInfo", {
//                     credentials: "include",
//                 });

//                 const data = await res.json();

//                 console.log(data); // Check response

//                 setCategory(data.category);
//             } catch (err) {
//                 console.log(err);
//             }
//         }})
//   return <div className='test-red test-9xl'>Category: {category}</div>;
// };

// export default Dashboard;