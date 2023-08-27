import React  from 'react';


function Carrusel() {
  

  return (
    <div class="container text-light text-center">
      <div class="position-absolute top-50 start-50 translate-middle">
        <h1>Esto es un titulo</h1>
        <p>Esto esun parrafo que contendra informacion relacionada a open311 que es mi proyecto de Thincrs</p>
        <a class="btn btn-outline-danger" href="/request" role="button">Request</a>
      </div>
    </div>
  );
}

export default Carrusel;