import React, {Component} from 'react';
import './notificationHome.css';
import {Link} from 'react-router-dom';

class NotificationHome extends Component {
    render() {
        return (
            <div className={"notification-home"}>
                Please click on one of the following options:
                <br/><br/>
                <Link to={"/emisetup"}>Setup EMI due dates</Link>
                <br/>
                <Link to={"/emiview"}>View EMI due dates</Link>
                <br/>
                <Link to={"/optreports"}>Opt-in/Opt-out for expense report</Link>
                <br/>
            </div>
        );
    }
}

export default NotificationHome;