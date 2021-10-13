import React from "react";
import { Button } from "@mui/material";
import { Fade } from "react-reveal";
import { useHistory } from "react-router-dom";
import "../styles/Card.css";

const Card = ({ data }) => {
  const history = useHistory();
  return (
    <Fade bottom cascade>
      <div className="card">
        <img
          src={
            data.img ||
            "http://scanivalve.com/wp-content/plugins/lightbox/images/No-image-found.jpg"
          }
          alt={data.description}
        />
        <h1>{data.description}</h1>
        <h2>{data.status}</h2>
        <strong>{data.price} COP</strong>
        <Button
          color="success"
          variant="contained"
          onClick={() => history.push("/ventas")}
        >
          buy
        </Button>
      </div>
    </Fade>
  );
};

export default Card;
