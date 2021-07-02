import React from "react";
import { Button } from "react-bootstrap";

import { alertDispatch } from "store/dispatchs/dispatchs";

function Login() {
  return (
    <div>
      <p>Login</p>
      <Button onClick={() => alertDispatch("success", "test")}>Alert</Button>
    </div>
  );
}

export default Login;
