/*
 * Author: Devraj Singh
 */

import React from "react";

const OPTSuccess = (props) => {
    return (
        <div className={"opt-success"}>
            <h3>Thanks. We have updated your choice in our database.</h3>
            <h4>Your choice: {props.choice}</h4>
        </div>
    );
}

export default OPTSuccess;