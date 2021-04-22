import React, {useState} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



import "./App.css";

function Login(props) {
   const [email, setEmail] = useState('')
  const [passWord, setPassWord] = useState('')
  
  const sendSchoolInfo = async(e) => {
    e.preventDefault();

    const data = {
     
      email,
      passWord
    }      
    await fetch('/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {         
        props.history.push('/') 
      } else {  
        console.log("Something wrong!");
      }
    })
    .catch((error) => {
      return Promise.reject()
    });
  }
  return (
    <div className="login">
      <h1>here you can  logg in </h1>
      
      <Form >
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="exampleEmail" className="mr-sm-2">Email</Label><br/>
        <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="examplePassword" className="mr-sm-2">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
      </FormGroup><br/>
      <Button>Submit</Button>
    </Form>
        
     
    </div>
  );
}

export default Login;