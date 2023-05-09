
import React, { useState } from "react";
import classes from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Wrapper from "../Helpers/Wrapper";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [enteredMobile, setEnteredMobile] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("")
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUserName.trim().length === 0 &&  enteredMobile.trim().length===0  && enteredEmail.trim().length===0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name, E-mail & Mobile Number (non-empty values)",
      });
      return;
    }
    
    if (enteredMobile.toString().length <=10){
      setError({
        title: "Invalid Mobile Number",
        message: "Please enter a valid Mobile Number ",
      });
      return;
    }
    props.onAddUser(enteredUserName, enteredEmail, enteredMobile);
    setEnteredUserName("");
    setEnteredEmail("");
    setEnteredMobile("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUserName(event.target.value);
  };

  const EmailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

  };

  const MobileChangeHandler = (event) => {
    setEnteredMobile(event.target.value);
  };
  
  const errorHandler = () => {
    setError(null);
  };
  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            value={enteredUserName}
            onChange={usernameChangeHandler}
          />
          <label htmlFor='E-mail'>E-mail</label>
          <input
            id='Email'
            type='email'
            value={enteredEmail}
            onChange={EmailChangeHandler}
          />
          <label htmlFor='Mobile'>Mobile (format: xxxx-xxx-xxx)</label>
          <input
            id='Mobile'
            type='tel'
            pattern="^\d{4}-\d{3}-\d{3}$"
            value={enteredMobile}
            onChange={MobileChangeHandler}
          />
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};
  export default AddUser;
