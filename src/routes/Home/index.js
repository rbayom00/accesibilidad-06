import React from 'react';
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div id="sidebar">
      <h1>Home</h1>
      <Link to="/ayiyi">Quiero ir a la pagina de error</Link>
      </div>
      <div id="detail"></div>
    </>
  );
}

export default Home;