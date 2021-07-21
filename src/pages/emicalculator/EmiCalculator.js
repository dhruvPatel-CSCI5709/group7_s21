/**
 * Author: Jemis Rameshbhai Zadafiya (B00873589)
 */
import React from "react";
import { Component } from "react";
import "./EmiCalculator.css";
import axios, { Routes } from "../../services/axios";
import Table from 'react-bootstrap/Table'


// EMI calculator: Takes Loan Category, Interest rate, Period of Loan, and Amount and gives Monthly EMI, Total Payment, and Total Interest
export default class EmiCalculator extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: null,
      isOpen: false
    }
  }

  
  resetEMIData = () => {
    this.setState({data : null})

  }
  onSubmitForm = async (e) =>  {
    e.preventDefault()
    const formData = new FormData(e.target)
    const body = {}
    formData.forEach((value, property) => body[property] = value)
    console.log(body)
    
    try {
      const { url, method } = Routes.api.emiCalculate();
      const { data } = await axios[method](url, body);
      console.log(data)
      this.setState({data: data})
      this.setState({isOpen: true})

    } catch (err) {
      console.log(err) 
    } 
  }

  toggleModal (isOpen) {
    this.setState({isOpen:isOpen});
  }

  render(){

    return (
      <div>
        <div className="form-wrapper">
          <h1>EMI Calculator</h1>
          <form onSubmit={e => this.onSubmitForm(e)}>
            <div className="loancategory">
              <label htmlFor="loancategory">Loan Category</label>
              <input
                placeholder="Loan Category"
                type="text"
                required="required"
                name="loanCategory"
              />
            </div>
            <div className="amount">
              <label htmlFor="amount">Amount</label>
              <input
                placeholder="Amount"
                type="number"
                required="required"
                name="amount"
              />
            </div>
            <div className="interestrate">
              <label htmlFor="interestrate">Interest Rate</label>
              <input
                placeholder="Interest rate"
                type="number"
                required="required"
                name="interestRate"
              />
            </div>
            <div className="period">
              <label htmlFor="period">Period</label>
              <input
                placeholder="Loan period"
                type="number"
                required="required"
                name="period"
              />
            </div>
            <div className="calculate">
              <button type="submit">Calculate</button>
            </div>
            <div className="reset">
              <button type="reset" onClick={this.resetEMIData}>Reset</button>
            </div>
          </form>
        </div>
        <div class="emitable">
          <Table striped bordered hover class="table table-sm">
            <tbody>
              <tr>
                <td><h4>Monthly EMI</h4></td>
                <td>{this.state.data ? <h4>{this.state.data.emiModel.monthlyEMI.toFixed(2)}</h4>: null}</td>
              </tr>
              <tr>
                <td><h4>Total Interest</h4></td>
                <td>{this.state.data ? <h4>{this.state.data.emiModel.totalInterest.toFixed(2)}</h4>: null}</td>
              </tr>
              <tr>
                <td><h4>Total Payment</h4></td>
                <td>{this.state.data ? <h4>{this.state.data.emiModel.totalPayment.toFixed(2)}</h4>: null}</td>
              </tr>
            </tbody>
          </Table> 
        </div>
        
      </div>
    );
  }
  
}