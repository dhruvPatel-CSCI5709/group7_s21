import React, { Component } from "react";
import "./opt_expense.css";

class OptExpense extends Component {
  render() {
    return (
      <div>
        <div className={"opt-expense"}>
          <h4>
            Do you want to receive periodic updates about your expense report?
            We will send them via email and SMS on daily, weekly and monthly
            basis.
          </h4>
          <div className={"opt-table"}>
            <form>
            <table>
              <tr >
                <td>
                  <input type="radio" id="optin" name="optbutton" value="opt_in" checked={true} />
                  <label className="opt" htmlFor="opt-in">
                    Yes
                  </label>
                </td>
                <td>
                  <input type="radio" id="optout" name="optbutton" value="opt_out" />
                  <label className="opt" htmlFor="opt-out">
                    No
                  </label>
                </td>
              </tr>
              <tr >
                <td colSpan={"3"}>
                  <input className={'opt-submit'} type={"submit"} value={"Submit"} />
                </td>
                {/*<td>
                  <button className={'submit-button'} type={"button"} onClick={this.clearText}>
                    Cancel
                  </button>
                </td>*/}
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
