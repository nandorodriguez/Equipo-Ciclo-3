import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
// import { Row } from "react-bootstrap";
// import { Col } from "react-bootstrap";
import { Form, FormControl } from "react-bootstrap";
=======
import { Form } from "react-bootstrap";
>>>>>>> 1ecaa21c635a9f2e98b447ac79f99cf8e039b981
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";

import "./Producto.css";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts, handleUpdateProducts } from "../../features/productSlice";

const Producto = () => {
<<<<<<< HEAD
  const [rows, setRows] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [isEditing, setIsEditing] = useState({ state: false, idProduct: "" });
  const [newProduct, setNewProduct] = useState({
    idProduct:"",
    description: "",
    price: "",
    status: "",
  });
  const handleNewProduct = () => {
    const {idProduct, description, price, status } = newProduct;

    setRows([
      {
        idProduct,
        description,
        price,
        status,
      },
      ...rows,
    ]);
    setNewProduct({
      idProduct:"",
      description: "",
      price: "",
      status: "",
    });
  };

  const handleUpdateProduct = () => {
    const oldData = [...rows];
    const newData = oldData.filter((row) => {
      if (row.idProduct === isEditing.idProduct) {
        row.idProduct = newProduct.idProduct
        row.description = newProduct.description;
        row.price = newProduct.price;
        row.status = newProduct.status;
      }
      return row;
    });

    setRows(newData);
    setNewProduct({
      idProduct:"",
      description:"",
      price: "",
      status: "",
    });
    setIsEditing({ ...isEditing, state: false, idProduct: "" });
  };

  const handleOnChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handleRow = (idProduct) => {
    const option = window.confirm(
      "Ok: Editar registro \nCancel: Borrar registro"
    );
    const row = rows.find((row) => row.idProduct === idProduct);

    if (option) {
      setIsEditing({ ...isEditing, state: true, idProduct: idProduct });
      setNewProduct({
        idProduct:row.idProduct,
        description:row.description,
        price: row.price,
        status: row.status,
      });
    } else {
      setRows(rows.filter((row) => row.idProduct !== idProduct));
    }
  };

=======
  const products = useSelector(selectProducts)
  const dispatch = useDispatch();
  const handleAddProduct = () => {

  }
  const handleEditProduct = () => {

  }
  const handleDeleteProduct = () => {
    
  }
>>>>>>> 1ecaa21c635a9f2e98b447ac79f99cf8e039b981
  return (
    <div>
      <Container className="box-effect">
        <div className="row">
          <h1 className="title-style text-center">product registration</h1>
        </div>
        <div>
          <Form className="row d-flex justify-content-center">
            <FormControl
              type="search"
              placeholder="Search"
              className="col-6"
              aria-label="Search"
              nChange={(e) => setSearchData(e.target.value)}
            />
            <Button variant="outline-success">Search</Button>
            <Form.Group
              className="col-8 mb-4 mt-4"
              controlId="formBasicPassword"
              onChange={(e) => handleOnChange(e)}
            >
              <Form.Control
                name="idProduct"
                type="id"
                placeholder="Id Product"
              />
            </Form.Group>

            <Form.Group
              className="col-8 mb-4 mt-4"
              controlId="description"
              onChange={(e) => handleOnChange(e)}
            >
              <Form.Control name="description" placeholder="Description" />
            </Form.Group>
            <Form.Group
              className="col-8 mb-4 mt-4"
              controlId="price"
              onChange={(e) => handleOnChange(e)}
            >
              <Form.Control name="price" placeholder="Price" />
            </Form.Group>
            <Form.Group
              className="col-8 mb-4 mt-4"
              controlId="status"
              onChange={(e) => handleOnChange(e)}
            >
              <Form.Control name="status" placeholder="Status Product" />
            </Form.Group>
          </Form>
        </div>
        <div className="row text-center pb-4">
          <div className="col-12">
          {!isEditing.state ? (
          <Button
            variant="contained"
            className=" mb-4 mt-4 text-center"
            variant="primary"
            type="submit"
            onClick={() => handleNewProduct()}
          >
            Upload Product
          </Button>
        ) : (
          <Button
             
            
            className=" mb-4 mt-4 text-center"
            variant="secondary"
            color="success"
            onClick={() => handleUpdateProduct()}
          >
            Actualizar datos
          </Button>
        )}
          </div>
        </div>

        {/* tabla de registro de productos  */}
        
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            <Table striped bordered hover className="col-8 overflow-auto">
              <thead>
                <tr>
                  <th>Id Product</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>State Product</th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter((row) =>
                    JSON.stringify(row)
                      .trim()
                      .toLowerCase()
                      .includes(searchData.trim().toLowerCase())
                  )
                  .map((row) => (
                    <tr
                      key={row.idProduct | 0}
                      onClick={() => handleRow(row.idProduct)}
                    >
                      <td>{row.idProduct}</td>
                      <td>{row.description}</td>
                      <td>{row.price}</td>
                      <td>{row.status}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Producto;
