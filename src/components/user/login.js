import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { auth } from '../../services/user-service';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';


export function Login() {
  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();

  const navigate = useNavigate()

  const { setAuth } = useAuth();

  const login = async e => {
    e.preventDefault();
    const data = await auth({username, password});
    
    setAuth(data);
    navigate('/')
  };

  return (
    <>
      <Link to='/'>back</Link>
    
      <div className="login" id='login'>
      
      <h1>Login</h1>

      <br/>
      <Form >

        <Form.Group controlId='formUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control style={{weight:"90px"}} type='username' placeholder='Username'
          onChange={e => (setUsername(e.target.value))}/>
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='password'
          onChange={e => (setPassword(e.target.value))}/>
        </Form.Group>

        <br/>
        <Button type='submit' onClick={login}>Login</Button>

      </Form>
    </div>
    </>
  );
}

