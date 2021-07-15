import React from "react";
import { useHistory } from "react-router-dom";
import "./IncorrectPassword.css";

export default function IncorrectPassword() {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.email.value === "jon_snow@gmail.com") {
      window.alert("A temporary password has been sent to your email id.");
      let path = `/deleteProfile`;
      history.push(path);
    } else {
      window.alert("Incorrect email id. Please enter valid email id.");
    }
  };
  return (
    <div>
      <div className="root-div">
        <form onSubmit={handleSubmit}>
          <label for="email">
            Please enter email: (Hint: Use pre-filled email id for success)
            <br />
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="user-input"
            defaultValue={"jon_snow@gmail.com"}
          />
          <br />
          <input type="submit" className="user-submit" value="Submit"></input>
        </form>
      </div>
    </div>
  );
}
