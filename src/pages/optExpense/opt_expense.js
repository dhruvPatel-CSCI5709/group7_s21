/*
 * Author: Devraj Singh
 */

import React, { Component } from "react";
import "./opt_expense.css";
import OPTSuccess from "./optSuccess";
import axios from "axios";
import loggedInUser from '../notificationUser/user';

class OptExpense extends Component {
  #success = 0;

  constructor(props) {
    super(props);
    this.state = { redirect: false, choice:"-"};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.getOptDetails(loggedInUser.loggedInUserId);
    let statusElement = document.getElementById("current-status");
    if (statusElement) {
      if (this.state.is_opted === true) {
        document.getElementById("current-status").innerText="Current status: You are currently opted-in"
      } else {
        document.getElementById("current-status").innerText="Current status: You are currently opted-out"
      }
    }
  }

  getOptDetails = async userId =>  {
    const optReportApi = 'http://csci-5709-group7.herokuapp.com/api/optreports';
    const res = await axios.get(`${optReportApi}/${userId}`);
    if (res.data.success !== true) {
      console.log("Optreports api call failed");
      return;
    }
    console.log(res.data.data);
    let is_opted = res.data.data.is_opted;
    this.setState({is_opted: is_opted})
    this.setState({userEmail: res.data.data.user_email})
  }

  async handleSubmit(event) {
    event.preventDefault();
    let optionSelected = false;
    let choiceValue = "Opted-out for expense report"
    if (document.getElementById("optin").checked) {
      optionSelected = true;
      choiceValue = "Opted-in for expense report"
    }
    this.#success=1;
    await this.updateOptReport(loggedInUser.loggedInUserId, loggedInUser.loggedInUserEmail, optionSelected);
    this.setState({ redirect: true, choice: choiceValue});
  }

  async updateOptReport(userID, userEmail, is_opted) {
    const optReportApiPost = 'http://csci-5709-group7.herokuapp.com/api/optreports';
    const optReportApiPut = `http://csci-5709-group7.herokuapp.com/api/optreports/${userID}`;
    const optReportApiPayload = {
      'user_id': userID,
      'user_email': userEmail,
      'is_opted': is_opted
    }
    if (this.state.userEmail === '<NA>') {
      await axios.post(optReportApiPost, optReportApiPayload)
          .then(response => {
            console.log("Response: ", response.data);
          })
          .catch(error => {
            console.log("Error: ", error);
          })
    } else {
      await axios.put(optReportApiPut, optReportApiPayload)
          .then(response => {
            console.log("Response: ", response.data);
          })
          .catch(error => {
            console.log("Error: ", error);
          })
    }
  }

  render() {
    if(this.#success === 1) {
      return <OPTSuccess choice={this.state.choice} />
    }
    return (
      <div>
        <div className={"opt-expense"}>
          <h4 id={"current-status"}>--</h4>
          <h4>
            Do you want to receive periodic updates about your expense report?
            We will send them via email and SMS on daily, weekly and monthly if you choose to Opt-in
            basis.
          </h4>
          <div className={"opt-table"}>
            <form>
            <table>
              <tr >
                <td>
                  <input type="radio" id="optin" name="optOption" value="opt_in" checked={true} />
                  <label className="opt" htmlFor="opt-in">
                    Opt-in
                  </label>
                </td>
                <td>
                  <input type="radio" id="optout" name="optOption" value="opt_out" />
                  <label className="opt" htmlFor="opt-out">
                    Opt-out
                  </label>
                </td>
              </tr>
              <tr >
                <td colSpan={"3"}>
                  <input className={'opt-submit'} type={"submit"} value={"Submit"} onClick={this.handleSubmit}/>
                </td>
              </tr>
            </table>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default OptExpense;
