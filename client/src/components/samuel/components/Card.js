import React from "react";
import { Button } from "@mui/material";
import "../styles/Card.css";
const Card = ({ data }) => {
  return (
    <div className="card">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <img
        src="https://ichef.bbci.co.uk/news/800/cpsprodpb/15665/production/_107435678_perro1.jpg"
        alt="perro"
      />
      <h1>{data.description}</h1>
      <h2>{data.status}</h2>
      <strong>{data.price}</strong>
      <Button color="success" variant="contained">
        buy
      </Button>
    </div>
  );
};

export default Card;
