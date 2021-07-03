import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

function Home({ history }) {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <div>
      <p>Home</p>
      <Button onClick={() => localStorage.clear()}>Sair</Button>
    </div>
  );
}

export default Home;
