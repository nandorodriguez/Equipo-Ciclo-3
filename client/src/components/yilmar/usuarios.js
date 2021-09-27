import React, { useState } from "react";
import {
  Button,
  TextField,
  BottomNavigationAction,
  BottomNavigation,
  Checkbox,
  FormControlLabel,
  FormGroup
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const Usuarios = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      Usuarios <Button variant="contained">Nuevo</Button>
      <TextField id="standard-basic" label="Standard" variant="standard" />
      <Button variant="outlined">Buscar</Button>
      <br />
      <br />
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Todos" icon={<RestoreIcon />} />
        <BottomNavigationAction
          label="Administradores"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction label="Editores" icon={<LocationOnIcon />} />
      </BottomNavigation>
      <div>
        <Button variant="contained">Editar</Button>;
        <Button variant="contained">Eliminar</Button>;
        <Button variant="contained">Cambiar Rol</Button>;
        <Button variant="contained">Ver</Button>;
      </div>
      <div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Nombre de usuario"
          />
          <FormControlLabel
            disabled
            control={<Checkbox />}
            label="nombres y ape"
          />
        </FormGroup>
        <input
          type="checkbox"
          value="nombre de usuario"
          title="nombre de usuario "
        />{" "}
        Nombre de usuario | Nombres y apellidos | Correo electronico | Perfil{" "}
        <br />
      </div>
    </div>
  );
};

export default Usuarios;
