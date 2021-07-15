import React, {Component} from 'react';
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import "./opt_expense.css";

class OptExpense extends Component {
    render() {
        return (
            <div>
                <Header title="Opt-in/Opt-out for expense report"/>
                <Sidebar/>
                <div className={"opt-expense"}>
                <h4>Do you want to receive periodic updates about your expense report? We will send them via email and SMS on daily, weekly and monthly basis.</h4>
                <form>
                    <input type="radio" name="opt_in" value="opt_in" checked={true}/>
                    <label className="opt" htmlFor="opt-in">Yes</label><br/>
                    <input type="radio" name="opt_out" value="opt_out" />
                    <label className="opt" htmlFor="opt-out">No</label><br/><br/>
                    <div className={"submit-button"}>
                        <input type={"submit"} value={"Submit"}/>
                        <button type={"button"} onClick={this.clearText}>Cancel</button>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default OptExpense;