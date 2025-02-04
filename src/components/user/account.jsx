import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { changePassword, uploadAvatar } from "../../services/user-service";
import { Login } from "./login";

function Account() {

  const [ oldPassword, setOldPassword ] = useState();
  const [ newPassword, setNewPassword ] = useState();
  const [ newPassword2, setNewPassword2 ] = useState();

  const {authData} = useAuth()
  const [ image, setImage ] = useState()

  const match = () => {
    return (newPassword===newPassword2)
  }

  const changePass = async e => {
    e.preventDefault();
    if(match){
      const token = authData.token;
      
      const regData = await changePassword(authData.user.id, token, {'old_password': oldPassword, 'new_password': newPassword})

      if(regData){
        console.log(regData)
      }
      
    } else{
      console.log(e)
    }
  }

  const upload = () => {
    const dataForm = new FormData();
    dataForm.append("image", image, image.name);
    console.log(dataForm);
    console.log(authData);
    uploadAvatar(authData.user.profile.id, dataForm, authData.token);
  }

  return (
    <>
      {authData ?
        <Container>
          <Link to='/'>back</Link>
          <h1>Account</h1>

            {authData.user.profile.image &&
              <Image src={'http://127.0.0.1:8000'+authData.user.profile.image} roundedCircle fluid width={70}/>
            }
            <h2>{authData.user.username}</h2>
            <br/>

          <Row>
            <Col>
            <h2>Change Image Profile</h2>
              <Form onSubmit={upload}>
                <Form.Group>
                  <Form.Label>Upload file</Form.Label>
                  <Form.Control type='file' onChange={e => {setImage(e.target.files[0])}}/>
                </Form.Group>
                <Button onClick={upload}>Change</Button>
              </Form>
            </Col>
            <Col>
              <h2>Change Password</h2>
              <Form className='needs-validation'>
              
        
                <Form.Group controlId='formPassword'>
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control type='username' placeholder='Old Password'
                  onChange={e => (setOldPassword(e.target.value))}/>
                </Form.Group>
        
                <Form.Group controlId='formPassword'>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type='password' placeholder='Password'
                  onChange={e => (setNewPassword(e.target.value))}/>
                </Form.Group>
        
                <Form.Group controlId='formPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type='password' placeholder='Password'
                  onChange={e => (setNewPassword2(e.target.value))}/>
                </Form.Group>
        
                <br/>
                <Button onClick={changePass}>Change Password</Button>
                
              </Form>
            </Col>
          </Row>
        </Container>
        :
        <Container>
          <Login />
        </Container>
      }
    </>
  );
}

export default Account;