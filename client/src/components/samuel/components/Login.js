import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Container,
  Button,
  TextField,
  Grid,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { handleLogin } from "../../../features/userSlice";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  const uri = "http://localhost:8080/usuarios";
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const [userRegistered, setUserRegistered] = useState({
    email: "",
    password: "",
  });
  const [userToRegister, setUserToRegister] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  let usuario = {
    idGoogle: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    role: "",
    estado: "",
  };
  const handleSignIn = async () => {
    const userExist = users.find(
      (user) =>
        user.email === userRegistered.email &&
        user.password === userRegistered.password
    );
    if (userExist) {
      usuario = {
        idGoogle: userExist.idGoogle,
        nombre: userExist.nombre,
        apellido: userExist.apellido,
        email: userRegistered.email,
        password: userExist.password,
        estado: userExist.estado,
        role: userExist.role,
      };
      await axios.post("http://localhost:8080/usuarios", usuario);
      dispatch(handleLogin(usuario));
    } else {
      alert("There was a problem with your credentials");
    }
    setUserRegistered({
      email: "",
      password: "",
    });
  };
  const handleSignUp = async () => {
    const userExist = users.find((user) => user.email === userToRegister.email);
    if (userExist) {
      alert("There is an user with that email");
    } else {
      let usuario = {
        idGoogle: uuidv4(),
        nombre: userToRegister.name,
        apellido: userToRegister.lastName,
        email: userToRegister.email,
        password: userToRegister.password,
        role: "user",
        estado: "Inactive",
      };
      dispatch(
        handleLogin({
          id: usuario.idGoogle,
          name: usuario.nombre,
          email: usuario.email,
          photo: null,
        })
      );
      await axios.post("http://localhost:8080/usuarios", usuario);
    }
    setUserToRegister({
      name: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const handleSignInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(
          handleLogin({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        usuario = {
          idGoogle: user.uid,
          nombre: user.displayName.split(" ")[0],
          apellido: user.displayName.split(" ")[1],
          email: user.email,
          role: "user",
          estado: "Inactive",
        };
      })
      .then(async () => {
        await axios.post("http://localhost:8080/usuarios", usuario);
      })
      .finally(() => {
        usuario = {
          idGoogle: "",
          nombre: "",
          apellido: "",
          email: "",
          password: "",
          role: "",
          estado: "",
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnChangeUserRegistered = (e) => {
    setUserRegistered({ ...userRegistered, [e.target.name]: e.target.value });
  };
  const handleOnChangeUserToRegister = (e) => {
    setUserToRegister({ ...userToRegister, [e.target.name]: e.target.value });
  };
  const fetchData = async () => {
    await axios.get(uri).then(({ data }) => setUsers(data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLogin) {
    return (
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              variant="standard"
              label="Email Address"
              name="email"
              value={userRegistered.email}
              onChange={(e) => handleOnChangeUserRegistered(e)}
            />
            <TextField
              margin="normal"
              variant="standard"
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={userRegistered.password}
              onChange={(e) => handleOnChangeUserRegistered(e)}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleSignIn()}
              sx={{ mt: 3, mb: 1 }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              color="error"
              startIcon={<GoogleIcon />}
              sx={{ mb: 1 }}
              variant="contained"
              onClick={() => handleSignInWithGoogle()}
            >
              Sign In with Google
            </Button>
            <Grid container>
              <Grid item>
                <Button onClick={() => setIsLogin(false)}>
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                variant="standard"
                name="name"
                fullWidth
                label="First Name"
                value={userToRegister.name}
                onChange={(e) => handleOnChangeUserToRegister(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                variant="standard"
                fullWidth
                label="Last Name"
                name="lastName"
                value={userToRegister.lastName}
                onChange={(e) => handleOnChangeUserToRegister(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                variant="standard"
                fullWidth
                label="Email Address"
                name="email"
                value={userToRegister.email}
                onChange={(e) => handleOnChangeUserToRegister(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                variant="standard"
                name="password"
                label="Password"
                type="password"
                value={userToRegister.password}
                onChange={(e) => handleOnChangeUserToRegister(e)}
              />
            </Grid>
          </Grid>
          <Button
            onClick={() => handleSignUp()}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={() => setIsLogin(true)}>
                Already have an account? Sign In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
