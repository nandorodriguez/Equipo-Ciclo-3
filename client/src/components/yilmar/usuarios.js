import React,{useState} from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import AgregarUsr from '../components/AgregarUsr';
import ListadoUsuarios from '../components/ListadoUsuarios';
import { Container } from 'react-bootstrap';

const Usuarios = () => {
  

  const usuario=[
    {
      id: "1",
      nombre: "Yilmar Garcés Navia",
      correo: "gilmar.garces@gmail.com",
      usuario: "YilmarGN",
      rol: "admin",
      estado:"activo",
    },
    {
      id: "2",
      nombre: "Shukui Nazari Bedoya Franco",
      correo: "zuky-mazury@gmail.com",
      usuario: "ZukyBF",
      rol: "vendedor",      
      estado:"activo",
    },
    {
      id: "3",
      nombre: "Edier Vicente Aristizabal Giraldo",
      correo: "edier-andres@gmail.com",
      usuario: "EdierAG",
      rol: "admin",      
    },
    {
      id: "4",
      nombre: "Wilder Samuel Taborda Cerón",
      correo: "samuel-ceron@gmail.com",
      usuario: "SamuelTC",
      rol: "vendedor",      
      estado:"activo",
    },
    {
      id: "5",
      nombre: "Fernando Rodriguez Davila",
      correo: "frodriguezdav@hotmail.com",
      usuario: "FerRD",
      rol: "vendedor",     
      estado:"activo", 
    }
  ]
  const [user,setUser]= useState([usuario]);
      return(
        <Container>
       <h2 className="text-center mt-2 mb-2">Administracion de Usuarios</h2>
       <hr/>
        <AgregarUsr user={user} setUser={setUser}/>
       <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="Todos">        
          <ListadoUsuarios usuario={usuario}/>        
        </Tab>
        <Tab eventKey="profile" title="Administradores">
            
        </Tab>
        <Tab eventKey="contact" title="Vendedores">
          
        </Tab>
      </Tabs>
  
      </Container>
      )
      
  };
  
  export default Usuarios;