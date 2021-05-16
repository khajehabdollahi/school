import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "./App.css";

const SchoolForm = (props) => {
  const [nameOfTheSchool, setNameOfTheSchool] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [economyLevel, setEconomyLevel] = useState();
  const [numberOfStudents, setNumberOfStudents] = useState();
  const [gender, setGender] = useState("");

  //FUNCTION TO SEND DATA TO BACKEND
  const sendSchoolInfo = async (e) => {
    e.preventDefault();

    const data = {
      nameOfTheSchool,
      email,
      phoneNumber,
      economyLevel,
      numberOfStudents,
      gender,
    };
    await fetch("/api/v1/school", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          props.history.push("/");
        } else {
          console.log("Something wrong!");
        }
      })
      .catch((error) => {
        return Promise.reject();
      });
  };

  // componentDidMount = () => {
  //   var id = this.props.match.params.id;
  //   console.log(id);
  // };

  // useEffect(() => {
  //   // console.log(this.props.match.params.id);
  //   const { id } = useParams();
  //   console.log(id);
  //   //
  // });

  return (
    <Form onSubmit={sendSchoolInfo} className="label">
      <FormGroup>
        <Label for="nameOfTheSchool">Name Of the School</Label>
        <Input
          type="text"
          name="shcoolName"
          id="nameOfTheSchool"
          placeholder="Write your school name."
          value={nameOfTheSchool}
          onChange={(e) => setNameOfTheSchool(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Write your Email."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="phoneNumber">Phone Number</Label>
        <Input
          type="number"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Write your Phone Number."
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="economyLevel">Economy Level</Label>
        <Input
          type="number"
          name="economyLevel"
          id="economyLevel"
          placeholder="Write your school's economy Level(0 to 10)"
          value={economyLevel}
          onChange={(e) => setEconomyLevel(e.target.value)}
          min="0"
          max="10"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="numberOfStudents">Number Of Students</Label>
        <Input
          type="number"
          name="numberOfStudents"
          id="numberOfStudents"
          placeholder="Write number of students of the school."
          value={numberOfStudents}
          onChange={(e) => setNumberOfStudents(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>Gender of the students</FormGroup>
      <div className="form-check">
        <input
          type="radio"
          className="mt-2"
          value="male"
          checked={gender === "male" ? true : false}
          onChange={(e) => setGender(e.target.value)}
        />
        <label className="form-check-label pl-2">male</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          className="mt-2"
          value="female"
          checked={gender === "female" ? true : false}
          onChange={(e) => setGender(e.target.value)}
        />
        <label className="form-check-label pl-2">female</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          className="mt-2"
          value="mixed"
          checked={gender === "mixed" ? true : false}
          onChange={(e) => setGender(e.target.value)}
        />
        <label className="form-check-label pl-2">Mixed</label>
      </div>
      <FormGroup>
        <Button type="submit">Submit</Button> <br />
      </FormGroup>
    </Form>
  );
};

export default SchoolForm;
