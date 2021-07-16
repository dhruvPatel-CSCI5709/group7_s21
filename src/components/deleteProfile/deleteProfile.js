import React from "react";
import { useHistory } from "react-router-dom";
import "./DeleteProfile.css";

export default function DeleteProfile() {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.password.value === "pass@1234") {
      window.alert("User Profile Deleted");
      let path = `/homePage`;
      history.push(path);
    } else {
      window.alert("Incorrect password");
    }
  };

  const handleForgotPassword = () => {
    let path = `/incorrectPassword`;
    history.push(path);
  };

  return (
    <div>
      <div className="root-div">
        <form onSubmit={handleSubmit}>
          <label for="password">
            Please enter password: (Hint : Use the pre-filled password for
            success)
            <br />
          </label>
          <input
            type="passsword"
            id="password"
            name="password"
            defaultValue={"pass@1234"}
            className="user-input"
          />
          <br />
          <input
            type="submit"
            value="Forgot Password"
            onClick={handleForgotPassword}
            className="user-submit"
          />
          <input className="user-submit" type="submit" value="Submit"></input>
        </form>
      </div>
    </div>
  );
}
