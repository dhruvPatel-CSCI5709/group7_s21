import React, {Component} from 'react';
import './emi_view.css';
import axios from "axios";
import Loading from "../loading/loading";

class EmiView extends Component {
    state = {
        emiDates: [],
        loading: true
    }

    async componentDidMount() {
        await this.getEMIDetails("dv247596");
        this.setState({loading: false})
        let emiViewTable = document.getElementById("emi-view-id");
        console.log(this.state.emiDates);
        for (let i = 0; i < this.state.emiDates.length; i++) {
            let row = emiViewTable.insertRow();
            let cell1 = row.insertCell();
            let cell2 = row.insertCell();
            let cell3 = row.insertCell();
            let cell4 = row.insertCell();
            cell1.textContent = this.state.emiDates[i].emi_name;
            cell2.textContent = this.state.emiDates[i].emi_amount + " CAD";
            const dueDay = this.state.emiDates[i].emi_due_day;
            cell3.textContent = "day " + dueDay + " of every month";
            let deleteButton = document.createElement('input');
            deleteButton.className = "delete-button";
            deleteButton.type = "button";
            deleteButton.value = "Delete";
            const emi_id = this.state.emiDates[i].emi_id;
            deleteButton.onclick = async function () {
                let rowIndex = row.rowIndex;
                document.getElementById("emi-view-id").deleteRow(rowIndex);
                console.log("Deleted row number: ", rowIndex);
                console.log("Deleted emi-id:", emi_id)
                const emiDatesApi = 'http://csci-5709-group7.herokuapp.com/api/emidates';
                const res = await axios.delete(`${emiDatesApi}/${emi_id}`);
                console.log("Response: ", res);
            }
            cell4.appendChild(deleteButton);
        }
    }

    getEMIDetails = async userId =>  {
        const emiDatesApi = 'http://csci-5709-group7.herokuapp.com/api/emidates';
        const res = await axios.get(`${emiDatesApi}/${userId}`);
        if (res.data.success !== true) {
            console.log("EmiDates api call failed");
            return;
        }
        for(let i=0;i<res.data.data.length;i++) {
            console.log(res.data.data[i].emi_id);
        }
        this.setState({emiDates: res.data.data})
    }

    render() {
        if (this.state.loading) {
            return <Loading />
        }
        return (
            <div className={"emi-view"}>
                List of EMI due dates set by user:<br/><br/>
                <div className={"emi-view-table"}>
                    <table id={"emi-view-id"}>
                        <tr>
                            <th>EMI Name</th>
                            <th>EMI monthly amount</th>
                            <th>EMI Due day</th>
                            <th>Action</th>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default EmiView;