import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export function Accueil() {

  return (
    <>
      <div className="accueil" id='accueil'>
        <h1>Welcome to BWF</h1>
        <br/>
        <Link to="/login">
          <Button className='auth-button'>Login</Button>
        </Link>
        <Link to="/sigin">
          <Button className='auth-button'>Sigin</Button>
        </Link>
      </div>
    </>
  );
}