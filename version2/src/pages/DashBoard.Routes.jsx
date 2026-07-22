import React, { useState,useEffect } from 'react'

const DashBoard = () => {
  const [category, setCategory] = useState('');

  // useEffect triggers as soon as the component appears on screen
  useEffect(() => {
    async function getCategory() {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setCategory(data.category);
    }

    getCategory();
  }, []); // Run once on load

  return <div>Category: {category}</div>;
};

export default DashBoard