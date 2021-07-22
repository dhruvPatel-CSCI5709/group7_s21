/**
 * Author: Dhruv Bharatbhai Patel
 * Description: Handles Dashboard of logged in user
 */
import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import income_img from "../../assets/incomes.png";
import expense_img from "../../assets/expenses.jpg";
import { useHistory } from "react-router-dom";
import axios, { Routes } from "../../services/axios";
import { notificationTypes } from "../../constants";
import Notification from "../../components/Notifications/Notifications";
import moment from "moment";

export default function Dashboard() {
  const history = useHistory();
  const [totalIncomeAmount, setIncomeAmount] = useState(0);
  const [totalExpenseAmount, setExpenseAmount] = useState(0);
  const [totalSavings, setSavingAmount] = useState(0);
  const [incomes, setIncomes] = useState(null);
  const [expenses, setExpenses] = useState(null);

  /**
   * Description: changes route to income page
   */
  const routeChange_income = () => {
    let path = `/income`;
    history.push(path);
  };

  /**
   * Description: changes route to expense page
   */
  const routeChange_expense = () => {
    let path = `/expense`;
    history.push(path);
  };

  useEffect(() => {
    loadTotalExpense();
    loadTotalIncome();
    loadSavings();
    loadExpenses();
    loadIncomes();
  }, []);

  /**
   * Description: sets total expenses of user
   */
  const loadTotalExpense = async () => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.getAllExpensesTotal(userId);
      const { data } = await axios[method](url);
      setExpenseAmount(data.data);
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  /**
   * Description: sets total incomes of user
   */
  const loadTotalIncome = async () => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.getAllIncomesTotal(userId);
      const { data } = await axios[method](url);
      setIncomeAmount(data.data);
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  /**
   * Description: loads savings data = {expense-incomes}
   */
  const loadSavings = async () => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.getSavings(userId);
      const { data } = await axios[method](url);
      setSavingAmount(data.data);
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  /**
   * Description: loads expenses data
   */
  const loadExpenses = async () => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.getExpensesDashboard(userId);
      const { data } = await axios[method](url);
      setExpenses(data.data);
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };

  /**
   * Description: loads incomes data
   */
  const loadIncomes = async () => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.getIncomesDashboard(userId);
      const { data } = await axios[method](url);
      console.log(data.data);
      setIncomes(data.data);
    } catch (err) {
      Notification(notificationTypes.ERROR, err);
    }
  };
  return (
    <div>
      <div className="main-dashboard">
        <div className="thought-dashboard">
          <p className="a">
            Do not save what is left after spending, but spend what is left
            after saving.
            <br />
            -Warren Buffet
          </p>
        </div>
        <div className="tasks-dashboard">
          <div className="individual-task">
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>Incomes</div>
            <br />
            <div style={{ fontSize: "20px", color: "#888888" }}>
              {totalIncomeAmount}
            </div>
          </div>
          <div className="individual-task">
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>Expenses</div>
            <br />
            <div style={{ fontSize: "20px", color: "#888888" }}>
              {totalExpenseAmount}
            </div>
          </div>
          <div className="individual-task">
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>
              Saved money
            </div>
            <br />
            <div style={{ fontSize: "20px", color: "#888888" }}>
              {totalSavings}
            </div>
          </div>
        </div>
        <div className="profile-info-container-dashboard">
          <div className="profile-info-left-dashboard">
            <div className="profile-info-left-image-dashboard">
              <img
                className="profile-image-dashboard"
                src={income_img}
                alt="Your face"
              />
            </div>
            <div className="image-desc-dashboard">
              <h6>Incomes</h6>
            </div>
          </div>
          <div className="profile-info-right-dashboard">
            <div className="finance-info-cards-dashboard">
              <div className="profile-info-card-type-dashboard">
                Your recent incomes
              </div>
              {incomes === null ? (
                <p></p>
              ) : incomes.length === 0 ? (
                <p></p>
              ) : (
                <>
                  {incomes.map((income, index) => (
                    <div className="profile-info-card-row-dashboard">
                      <div style={{ fontSize: "18px" }}>{income.title}</div>
                      <div>{income.amount}</div>
                      <div>
                        {moment(income.dateOfExpense).format("YYYY-MM-DD")}
                      </div>
                      <div style={{ fontSize: "18px" }}>
                        {income.paymentMethod}
                      </div>
                    </div>
                  ))}
                </>
              )}
              <div
                className="profile-info-card-viewAll-dashboard"
                onClick={routeChange_income}
              >
                <a href={routeChange_income} target="_blank">
                  View all
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-info-container-dashboard">
          <div className="profile-info-left-dashboard">
            <div className="profile-info-left-image-dashboard">
              <img
                className="profile-image-dashboard"
                src={expense_img}
                alt="Your face"
              />
            </div>
            <div className="image-desc-dashboard">
              <h6>Expenses</h6>
            </div>
          </div>
          <div className="profile-info-right-dashboard">
            <div className="finance-info-cards-dashboard">
              <div className="profile-info-card-type-dashboard">
                Your recent expenses
              </div>
              {expenses === null ? (
                <p></p>
              ) : expenses.length === 0 ? (
                <p></p>
              ) : (
                <>
                  {expenses.map((expense, index) => (
                    <div className="profile-info-card-row-dashboard">
                      <div style={{ fontSize: "18px" }}>{expense.title}</div>
                      <div>{expense.amount}</div>
                      <div>
                        {moment(expense.dateOfExpense).format("YYYY-MM-DD")}
                      </div>
                      <div style={{ fontSize: "18px" }}>
                        {expense.paymentMethod}
                      </div>
                    </div>
                  ))}
                </>
              )}
              <div
                className="profile-info-card-viewAll-dashboard"
                onClick={routeChange_expense}
              >
                <a href={routeChange_income} target="_blank">
                  View all
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
