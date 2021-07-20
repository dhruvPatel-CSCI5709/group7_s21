import React from "react";
import "./EmiCalculator.css";
import axios, { Routes } from "../../services/axios";

export default class EmiCalculator {
  constructor(props) {
    super(props)
    this.state = {
      //no needed.
    }
  }

  onSubmitForm = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const body = {}
    formData.forEach((value, property) => body[property] = value)
    //here you can update, remove, add values/properties in the body object this is specially usefull if any custom process must be done to check, encrypt data or wherever you want.
    console.table(body)
    // Request goes here.
  }
  render() {
    return (
      <div>
        <div className="form-wrapper">
          <h1>EMI Calculator</h1>
          <form onSubmit = {e => this.onSubmitForm(e)}>
            <div className="loancategory">
              <label htmlFor="loancategory">Loan Category</label>
              <input
                placeholder="Loan Category"
                type="text"
                required="required"
                name="loancategory"
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
                name="interestrate"
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
              <button type="reset">Reset</button>
            </div>
          </form>
        </div>
      </div>
    );
    }
}
