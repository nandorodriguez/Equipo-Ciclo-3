import React, { useState, useEffect } from "react";

import axios from "axios";
import "../styles/Home.css";
import Card from "./Card";

const Home = () => {
  const uri = "http://localhost:8080/products";
  const [rows, setRows] = useState([]);
  
  const fetchData = async () => {
    await axios
      .get(uri)
      .then(({ data }) => setRows(data))
      .catch((e) => console.error(e));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="home">
        <div className="cards">
          {rows.map((row) => (
            <Card key={row._id} data={row} />
          ))}
        </div>
    </div>
  );
};

export default Home;
