import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  handleUpdateProducts,
  selectProducts,
} from "../../features/productSlice";
import "./Producto.css";

const Producto = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [isEditing, setIsEditing] = useState({ state: false, id: "" });
  const [newProduct, setNewProduct] = useState({
    idProduct: "",
    description: "",
    price: "",
    status: "",
  });
  useEffect(() => {
    setRows(products);
  }, [products]);
  console.log(rows);
  const handleNewProduct = () => {
    const { idProduct, description, price, status } = newProduct;
    dispatch(
      handleUpdateProducts([
        {
          idProduct,
          description,
          price,
          status,
        },
        ...rows,
      ])
    );
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
      idProduct: "",
      description: "",
      price: "",
      status: "",
    });
  };

  const handleUpdateProduct = () => {
    const oldData = [...rows];
    let newData = oldData.map((row) => {
      if (row.idProduct === isEditing.id) {
        return {
          ...row,
          description: newProduct.description,
          price: newProduct.price,
          status: newProduct.status,
        };
      }
      return row;
    });
    setRows(newData);
    dispatch(handleUpdateProducts(newData));
    setIsEditing({ ...isEditing, state: false, id: "" });
    setNewProduct({
      idProduct: "",
      description: "",
      price: "",
      status: "",
    })
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
      setIsEditing({ ...isEditing, state: true, id: idProduct });
      setNewProduct({
        idProduct: row.idProduct,
        description: row.description,
        price: row.price,
        status: row.status,
      });
    } else {
      setRows(rows.filter((row) => row.idProduct !== idProduct));
    }
  };

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
              onChange={(e) => setSearchData(e.target.value)}
            />
            {!isEditing.state && (
              <Form.Group
                className="col-8 mb-4 mt-4"
                controlId="formBasicPassword"
              >
                <Form.Control
                  value={newProduct.idProduct}
                  name="idProduct"
                  placeholder="Id Product"
                  onChange={(e) => handleOnChange(e)}
                />
              </Form.Group>
            )}

            <Form.Group
              className="col-8 mb-4 mt-4"
              controlId="description"
              onChange={(e) => handleOnChange(e)}
            >
              <Form.Control
                value={newProduct.description}
                name="description"
                placeholder="Description"
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>
            <Form.Group
              className="col-8 mb-4 mt-4"
              controlId="price"
              onChange={(e) => handleOnChange(e)}
            >
              <Form.Control
                value={newProduct.price}
                name="price"
                placeholder="Price"
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>
            <Form.Group
              className="col-8 mb-4 mt-4"
              controlId="status"
              onChange={(e) => handleOnChange(e)}
            >
              <Form.Control
                value={newProduct.status}
                name="status"
                placeholder="Status Product"
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="row text-center pb-4">
          <div className="col-12">
            {!isEditing.state ? (
              <Button
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
