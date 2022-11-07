import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import "./index.css";

const ErrorPage = () => {
  const [modalStatus, setModalStatus] = useState(false);

  const error = useRouteError();

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalStatus(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="error-page">
      {modalStatus ? (
        <div className="modal-error-page">
          <h1>Error 404 - Not found</h1>
          <h1>¿Dónde querías ir realmente?</h1>
          <Link to="/">Quiero ir a la pagina principal</Link>
        </div>
      ) : (
        "opps"
      )}
    </div>
  );
};

export default ErrorPage;
