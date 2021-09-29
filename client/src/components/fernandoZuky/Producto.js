import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import "./Producto.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProducts,
  handleUpdateProducts,
} from "../../features/productSlice";

const Producto = () => {
  const [product, setProduct] = useState({
    nameProduct: "",
    idProduct: "",
    quantity: 0,
    price: 0,
  });
  const [rows, setRows] = useState([]);
  // const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const handleAddProduct = () => {
    setRows([product, ...rows]);
    handleClear();
  };
  const handleEditProduct = () => {};
  const handleDeleteProduct = () => {};
  const handleClear = () => {
    setProduct({
      nameProduct: "",
      idProduct: "",
      quantity: 0,
      price: 0,
    });
  }
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Container className="box-effect">
        <div className="row">
          <h1 className="title-style">product registration</h1>
        </div>
        <div>
          <Form className="row d-flex justify-content-center">
            <Form.Group className="col-8 mb-4 mt-4" controlId="formBasicEmail">
              <Form.Control
                name="nameProduct"
                type="email"
                placeholder="Product Name"
                onChange={(e) => handleChange(e)}
              />
              <br />
              <Form.Control
                name="idProduct"
                type="id"
                placeholder="Id Product"
                onChange={(e) => handleChange(e)}
              />
              <br />
              <Form.Control
                name="quantity"
                type="number"
                placeholder="Quantity"
                onChange={(e) => handleChange(e)}
              />
              <br />
              <Form.Control
                name="price"
                placeholder="Price"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="row d-flex justify-content-end pb-4">
          <div className="col-6  pl-5">
            <Button
              className=" mb-4 mt-4 text-end offset-2"
              variant="primary"
              onClick={(e) => handleAddProduct(e)}
            >
              Upload Product
            </Button>
          </div>
          <div className="col-6 pr-5 style-button">
            <Button className=" col-2 mb-4 mt-4" variant="secondary" onClick={()=>handleClear()}>
              Clear
            </Button>
          </div>
        </div>
        {/* tabla de registro de productos  */}
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            {rows.length !== 0 ?  <Table striped bordered hover className="col-8">
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
                {rows.map((product, index) => (
                  <tr key={product.idProduct}>
                    <td>{index}</td>
                    <td>{product.idProduct}</td>
                    <td>{product.nameProduct}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>: <h2>No hay productos registrados</h2>}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Producto;
