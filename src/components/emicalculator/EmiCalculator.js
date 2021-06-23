import React from 'react';
import './EmiCalculator.css';
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
export default function EmiCalculator() {

  return (
    <div>
    <Header title="EmiCalculator" />
    <Sidebar />
    <div className="form-wrapper">
      <h1>EMI Calculator</h1>
      <form >
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
