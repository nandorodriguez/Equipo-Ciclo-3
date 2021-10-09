import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { handleLogin } from "../../../features/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../styles/Home.css";
import Card from "./Card";

import { Button } from "@mui/material";
const Home = () => {
  const uri = "http://localhost:8080/products";
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(handleLogin());
      })
      .catch((err) => console.log(err));
  };
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
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          handleSignOut();
        }}
      >
        logout
      </Button>
        <div className="cards">
          {rows.map((row) => (
            <Card key={row._id} data={row} />
          ))}
        </div>
    </div>
  );
};

export default Home;
