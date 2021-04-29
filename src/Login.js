import React, { useState } from 'react'
import ForgetPassword from './ForgetPassword';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';



import "./App.css";

function Login(props) {
   const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const sendSchoolInfo = async(e) => {
    e.preventDefault();

    const data = {
     
      username:email,
      password
    }      
    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        localStorage.loggedInUser = email;
        props.history.push('/') 
      } else {  
        console.log("Something wrong!");
      }
    })
    .catch((error) => {
      return Promise.reject()
    });
  }

  function handleChange(e) {
    let t = e.currentTarget;
    if (t.name == 'email') {
      setEmail(t.value);
    }
    if (t.name == 'password') {
      setPassword(t.value);
    }
  }

  return (
    <div className="login">
     
      <Container>
        <Row>
          <Col className=" xs lg=4">
       
          <Form onSubmit={sendSchoolInfo} >
            
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0 ">
        <Label for="exampleEmail" className="mr-sm-2">Email</Label><br/>
        <Input type="email" onChange={handleChange} name="email" id="exampleEmail" placeholder="something@idk.cool" />
            </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="examplePassword" className="mr-sm-2">Password</Label>
        <Input type="password" onChange={handleChange} name="password" id="examplePassword" placeholder="don't tell!" />
      </FormGroup><br/>
      <Button>Submit</Button>
            </Form> <br/><br/>

            <a href="http://localhost:3000/resetyourpassword" > <h2  >Forgot your password?</h2></a> <br/><br/>
            
            

       </Col>
            </Row>
      
        
        </Container>
        
 
    </div>
  );
}

export default Login;