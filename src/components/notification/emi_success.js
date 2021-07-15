import React from "react";

const EMISuccess = (props) => {
    return (
        <div className={"emi-success"}>
            <h2>EMI Due date has been registered. We will send you due dates notifications.</h2>
            <h3>Here are the details:</h3>
            <p><b>EMI Name: </b>{props.emi_name}</p>
            <p><b>EMI amount: </b>{props.emi_amount}</p>
            <p><b>EMI Due date: </b>{props.emi_due_date}</p>
        </div>
    );
}

export default EMISuccess;