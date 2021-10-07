
import Button from 'react-bootstrap/Button';
import { FormControl ,Navbar,Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import React,{useState} from "react";

const AgregarUsr = ({user,setUser}) => {

  const [newUser,setNewUser]= useState({
    id:"",
    nombre: "",
    correo: "",
    usuario: "",
    rol: "",
    estado:"inactivo",
  }
  );
  
  const handleOnChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const [rows, setRows] = useState([]);
  const handleNewUser = () => {
    const {id, nombre, correo, usuario,rol, estado } =
      newUser;
    setRows([
      {
        id,
        nombre,
        correo,
        usuario,
        rol,
        estado,
      },
      ...rows,
    ]);
    setNewUser({
      id:"",
      nombre: "",
      correo: "",
      usuario: "",
      rol: "",
      estado:"inactivo",
    });
  };
  
  const [searchData, setSearchData] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
    return (
      <div>
        
        
        <Navbar bg="light" expand="lg">        
        <Button  variant="primary" title="crear usuario" onClick={handleShow}>
          <i class="bi bi-person-plus-fill"></i>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
          </Button>

        <Navbar.Collapse id="navbarScroll" align="left">
            <Form className="d-flex">
            <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Buscar"
                onChange={(e) => setSearchData(e.target.value)}
            />
            </Form>
        </Navbar.Collapse>
        </Navbar>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" name="Nombre">
              <Form.Label>Nombres y apellidos</Form.Label>
              <Form.Control type="text" placeholder="digite su nombre" onChange={(e) => handleOnChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" name="Email">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control type="email" placeholder="Digite su email"  onChange={(e) => handleOnChange(e)}/>
              <Form.Text className="text-muted">
                Tenga en cuenta que el email debe tener la siguiente forma xxxxx@zzz.com.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" name="UserName">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control type="text" placeholder="Digite su nombre de usuario" onChange={(e) => handleOnChange(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" name="contraseña">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Digite su contraseña" onChange={(e) => handleOnChange(e)} />
            </Form.Group>

              <Form.Group name="formGridState">
                <Form.Label>Rol</Form.Label>
                <Form.Select defaultValue="Choose..." name="rol" onChange={(e) => handleOnChange(e)}>
                  <option>Seleccione una opcion...</option>
                  <option>Administracion...</option>
                  <option>Vendedor...</option>
                </Form.Select>
              </Form.Group>        
          </Form>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleNewUser}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      
    );
  };
  export default AgregarUsr;