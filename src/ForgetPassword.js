import React, { Component } from 'react'

export default class ForgetPassword extends Component {
  render() {
    return (
      <div>
        <h1>Have you forgotten your password?</h1><br/>
        <h1>Enert your Email Please</h1><br />
        
        <form action="" method="get" noValidate evaluated="false">
<label htmlFor="email">Your Email</label> <br/>
          <input type="email" name="email" id="email" /> <br/><br/>
          
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
