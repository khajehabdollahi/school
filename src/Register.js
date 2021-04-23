import React, {useState} from 'react'
import { Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Register = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  
  const registerUser = async(e) => {
    e.preventDefault();
    const data = {
      username,
      password
    }
    
    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        response = response.json();        
        props.history.push('/') 
      } else {  
        console.log(response);
      }
    })
    .catch((error) => {
      return Promise.reject()
    });
  }
  return (
    <Container>      
      <Form onSubmit={registerUser}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="Email" className="mr-sm-2">Email</Label>
            <Input type="text" name="email" id="Email" placeholder="something@idk.cool"
              value={username} onChange={e=>setUsername(e.target.value)}/>
        </FormGroup> <br/>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="Password" className="mr-sm-2">Password</Label>
          <Input type="password" name="password" id="Password" placeholder="don't tell!"
            value={password} onChange={e => setPassword(e.target.value)}/>
        </FormGroup>
        {/* <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="firstName" className="mr-sm-2">First Name</Label>
          <Input type="text" name="firstName" id="firstName" placeholder="firstName" 
            value={firstName} onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="lastName" className="mr-sm-2">Last Name</Label>
          <Input type="text" name="lastName" id="lastName" placeholder="lastName"
            value={lastName} onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="phoneNumber" className="mr-sm-2">Phone Number</Label>
          <Input type="number" name="phoneNumber" id="phoneNumber" placeholder="phoneNumber"
            value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
        </FormGroup> */}
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default Register;