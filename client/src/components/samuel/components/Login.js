import React from "react";
import {GoogleLogin} from "react-google-login";
import "../styles/Login.css";

const Login = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <div className="login">
      <GoogleLogin
        clientId="1067132800144-dgmcci3mba0sro4o6lbvr8b6vk1cn5pj.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={() => responseGoogle()}
        onFailure={() => responseGoogle()}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Login;
