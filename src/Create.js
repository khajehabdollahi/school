import React, {useState} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function Create(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userData = {
    username: email,
    password: password
  }

  const registerUser = async (e) => {
    e.preventDefault()
    await fetch('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        response = response.json();
        Promise.resolve(response)
          .then(user => console.log(user));
        props.history.push('/')
      } else {  
        console.log("Username is used!");
      }
    })
    .catch((error) => {
      return Promise.reject()
    });
  }

  return (
    <Form onSubmit={registerUser}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder"
          value={email} onChange={ e=> setEmail(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder"
        value={password} onChange={ e=> setPassword(e.target.value)}/>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default Create;