import { Container } from "react-bootstrap";
import Usuario from "./Usuario";
import Table from 'react-bootstrap/Table';


const ListadoUsuarios = ({ usuario}) => {
 
  return (
    <Container>
      <Table striped bordered hover variant="sm" class="table table-striped table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Nombre </th>
            <th>Correo</th>
            <th>Username</th>
            <th>Rol</th>
          </tr>
        </thead>
        {usuario.map((usuario) => (
          
            <Usuario usuario={usuario} />
          
        ))}
        
      </Table>
    </Container>
  );
  };

  export default ListadoUsuarios;