import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import { auth, register } from '../../services/user-service';
import { Link, useNavigate } from 'react-router-dom';


export function Sigin() { 

  const [ email, setEmail ] = useState();
  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();
  const [ password2, setPassword2 ] = useState();

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const match = () => {
    return (password===password2)
  }


  const sigin = async e => {
    e.preventDefault();
    if(match()){
      const userData = await register({password, email, username, profile:{}})
      // console.log(userData)

      if(userData.username===username){
        const data = await auth({username, password});
        // console.log(data);
        setAuth(data);
        // console.log("ready");
        navigate("/account");
      }

      // console.log(userData.username);

    }else{
      console.log("Erreur");
    }
  };


  return (
    <>
      <Link to='/'>back</Link>
    
    <div className="sigin" id='sigin'>
      <h1>Sigin</h1>
      <br/>
      <Form className='needs-validation'>

        <Form.Group controlId='formEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control style={{weight:"90px"}} type='username' placeholder='exemple@email.com'
          onChange={e => (setEmail(e.target.value))}/>
        </Form.Group>

        <Form.Group controlId='formusername'>
          <Form.Label>Username</Form.Label>
          <Form.Control style={{weight:"90px"}} type='username' placeholder='Username'
          onChange={e => (setUsername(e.target.value))}/>
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password'
          onChange={e => (setPassword(e.target.value))}/>
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password'
          onChange={e => (setPassword2(e.target.value))}/>
        </Form.Group>

        <br/>
        <Button onClick={sigin}>Sigin</Button>

      </Form>
    </div>
    </>
  );
}

