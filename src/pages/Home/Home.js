import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

function Home({ history }) {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <p>Home</p>
    </div>
  );
}

export default Home;
