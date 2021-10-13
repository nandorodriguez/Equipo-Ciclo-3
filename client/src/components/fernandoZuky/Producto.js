import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "./Producto.css";
import axios from "axios";
import UsuarioSinPermisos from "../samuel/components/UsuarioSinPermisos";

const Producto = () => {
  const user = useSelector(selectUser);
  const uri = "http://localhost:8080";
  const [rows, setRows] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [isEditing, setIsEditing] = useState({ state: false, id: "" });
  const [typeOfUser, setTypeOfUser] = useState({ type: "", status: "" });
  const [newProduct, setNewProduct] = useState({
    description: "",
    img: "",
    price: "",
    status: "",
  });
  const getUsers = async () => {
    await axios.get(uri + "/usuarios").then(({ data }) => {
      const userActual = data.find((userFind) => userFind.idGoogle === user.id);
      if (userActual) {
        if (userActual.role === "admin" && userActual.estado === "Active") {
          setTypeOfUser({ ...typeOfUser, type: "admin", status: "active" });
        }
        if (userActual.role === "admin" && userActual.estado === "Inactive") {
          setTypeOfUser({ ...typeOfUser, type: "admin", status: "inactive" });
        }
        if (userActual.role === "user" && userActual.estado === "Active") {
          setTypeOfUser({ ...typeOfUser, type: "user", status: "active" });
        }
        if (userActual.role === "user" && userActual.estado === "Inactive") {
          setTypeOfUser({ ...typeOfUser, type: "user", status: "inactive" });
        }
      }
    });
  };
  const fetchData = async () => {
    await axios.get(uri + "/products").then(({ data }) => setRows(data));
  };
  useEffect(() => {
    getUsers();
    fetchData();
  }, []);
  const handleNewProduct = async () => {
    await axios
      .post(uri, newProduct)
      .then(({ data }) => setRows(data))
      .catch((e) => console.error(e));
    setNewProduct({
      description: "",
      img: "",
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
          img: newProduct.img,
          price: newProduct.price,
          status: newProduct.status,
        };
      }
      return row;
    });
    setRows(newData);
    setIsEditing({ ...isEditing, state: false, id: "" });
    setNewProduct({
      description: "",
      img: "",
      price: "",
      status: "",
    });
  };
  const handleOnChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handleRow = async (idProduct) => {
    const option = window.confirm(
      "OK: Editar registro \nCANCEL: Borrar registro"
    );
    const row = rows.find((row) => row._id === idProduct);

    if (option) {
      setIsEditing({ ...isEditing, state: true, id: idProduct });
      setNewProduct({
        description: row.description,
        img: row.img,
        price: row.price,
        status: row.status,
      });
    } else {
      await axios
        .delete(uri, { data: { _id: idProduct } })
        .then(({ data }) => setRows(data));
    }
  };
  if (typeOfUser.type === "admin" && typeOfUser.status === "active") {
    return (
      <div className="admin">
        <Container className="box-effect">
          <br></br>
          <br></br>
          <div className="row">
            <h3 className="title-style text-center">Product Registration</h3>
          </div>
          <div>
            <Form className="row d-flex justify-content-center">
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
                controlId="img"
                onChange={(e) => handleOnChange(e)}
              >
                <Form.Control
                  value={newProduct.img}
                  name="img"
                  placeholder="Image URL"
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
                <Form.Select
                  aria-label="Default select example"
                  value={newProduct.status}
                  name="status"
                  placeholder="Product Status"
                  onChange={(e) => handleOnChange(e)}
                >
                  <option hidden>Product Status</option>
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </Form.Select>
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
                  Save Product
                </Button>
              ) : (
                <Button
                  className=" mb-4 mt-4 text-center"
                  variant="secondary"
                  color="success"
                  onClick={() => handleUpdateProduct()}
                >
                  Update Product
                </Button>
              )}
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <Form.Group className="col-2 mb-4 mt-1">
              <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchData(e.target.value)}
              />
            </Form.Group>
            <div className="col-8">
              <Table
                striped
                bordered
                hover
                variant="light"
                className="col-8 overflow-auto"
              >
                <thead>
                  <tr>
                    <th>Id Product</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Product Status</th>
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
                      <tr key={row._id} onClick={() => handleRow(row._id)}>
                        <td>{row._id}</td>
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
  }
  return <UsuarioSinPermisos />;
};

export default Producto;
