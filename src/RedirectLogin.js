import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class RedirectLogin extends Component {
  constructor() {
    super();
    this.state = {
      userid: "",
    };
  }

  redirectTologin = () => {
    console.log("redirect ....");
    return <Redirect to={"/logIn/" + this.state.userid} />;
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.setState({ userid: this.props.match.params.id });
  }

  render() {
    return (
      <div>
        <h1>Your account is activated PLS LOGIN</h1>

        <a href={"/logIn/" + this.state.userid}>Go To Login 11</a>

        <button onClick={this.redirectTologin}>Go TO LOG IN PAGE </button>
      </div>
    );
  }
}
// 