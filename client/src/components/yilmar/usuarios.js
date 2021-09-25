import React from 'react'

const Usuarios = () => {
    return (
        <div>
            Usuarios <input type="button" value="nuevo" />
            <input type="search" name="buscar" value="" />
            <input type="button" value="Buscar" />
            <br />
            <br />
            | Todos | Administrador | Editor | Otros |
            <br />
            <div>
                <input type="button" value="Editar" />
                <input type="button" value="Eliminar" />
                <input type="button" value="Cambiar rol" />
                <input type="button" value="Ver" />
            </div>
            <div>
                <input type="checkbox" value="nombre de usuario" title="nombre de usuario " /> Nombre de usuario | Nombres y apellidos | Correo electronico | Perfil <br />
            </div>
        </div>
    )
}

export default Usuarios 