import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Row } from "react-bootstrap";
// import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import "./Producto.css";

const Producto = () => {
  return (
    <div>
      <Container className="box-effect">
        <div className="row">
          <h1 className="title-style">product registration</h1>
        </div>
        <div>
          <Form className="row d-flex justify-content-center">
            <Form.Group className="col-8 mb-4 mt-4" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Product Name" />
            </Form.Group>

            <Form.Group
              className="col-8 mb-4 mt-4"
              controlId="formBasicPassword"
            >
              <Form.Control type="id" placeholder="Id Product" />
            </Form.Group>
            <Form.Group
              className="col-8 mb-4 mt-4"
              controlId="formBasicPassword"
            >
              <Form.Control type="number" placeholder="Quantity" />
            </Form.Group>

            <Form.Group
              className="col-8 mb-4 mt-4"
              controlId="formBasicPassword"
            >
              <Form.Control placeholder="Price" />
            </Form.Group>
          </Form>
         
        </div>
        <div className="row d-flex justify-content-end pb-4">
        <div className="col-6  pl-5">
            <Button
              className=" mb-4 mt-4 text-end offset-2"
              variant="primary"
              type="submit"
            >
              Upload Product
            </Button>
          </div>
          <div className="col-6 pr-5 style-button">
            <Button
              className=" col-2 mb-4 mt-4"
              variant="secondary"
              type="submit"
            >
              Clear
            </Button>
          </div>
        </div>
        {/* tabla de registro de productos  */}
        <div className="row d-flex justify-content-center">
        <div className="col-8">
        <Table striped bordered hover className="col-8">
          <thead>
            <tr>
              <th>#</th>
              <th>Id Product</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
        </div>
        </div> 
       
      </Container>
    </div>
  );
};

export default Producto;
