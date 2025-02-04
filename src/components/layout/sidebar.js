import React from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import { Accueil } from '../user/accueil';
import User from '../user/user';


function Sidebar() {

  const { authData, setAuth } = useAuth();

  const logout = async () => {
    setAuth(null);
    console.log("logout")
  }

  return (
    <div className='sidebar'>
      {!authData?
        <div className='auth'>
          <Accueil />
        </div>
      :
      <Container>
        <h1>Profile</h1>
        <br/> 
        <User user={authData.user}/>
        <br/>
        <br/>
        <Button type='submit' onClick={logout}>logout</Button>
      </Container>
      }
    </div>
  );
}

export default Sidebar;
