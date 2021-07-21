import React from "react";
import "./Dashboard.css";
import income_img from "../../assets/incomes.png";
import expense_img from "../../assets/expenses.jpg";

export default function Dashboard() {
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
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>
              Monthly revenue
            </div>
            <br />
            <div style={{ fontSize: "20px", color: "#888888" }}>16.5k CND</div>
          </div>
          <div className="individual-task">
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>Incomes</div>
            <br />
            <div style={{ fontSize: "20px", color: "#888888" }}>50k CND</div>
          </div>
          <div className="individual-task">
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>Expenses</div>
            <br />
            <div style={{ fontSize: "20px", color: "#888888" }}>40k CND</div>
          </div>
          <div className="individual-task">
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>
              Saved money
            </div>
            <br />
            <div style={{ fontSize: "20px", color: "#888888" }}>15k CND</div>
          </div>
          <div className="individual-task">
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>EMI</div>
            <br />
            <div style={{ fontSize: "20px", color: "#888888" }}>15k CND</div>
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
<<<<<<< HEAD
              {incomes === null ? (
                <p></p>
              ) : incomes.length === 0 ? (
                <p>No user available</p>
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
=======
              <div className="profile-info-card-row-dashboard">
                <div style={{ fontSize: "18px" }}>ID1</div>
                <div>04/05/2026</div>
                <div>Company1</div>
                <div style={{ fontSize: "18px" }}>10,000 CND</div>
              </div>
              <div className="profile-info-card-row-dashboard">
                <div style={{ fontSize: "18px" }}>ID2</div>
                <div>04/05/2026</div>
                <div>Company2</div>
                <div style={{ fontSize: "18px" }}>10,000 CND</div>
              </div>
              <div className="profile-info-card-row-dashboard">
                <div style={{ fontSize: "18px" }}>ID3</div>
                <div>04/05/2026</div>
                <div>Company3</div>
                <div style={{ fontSize: "18px" }}>10,000 CND</div>
              </div>
              <div className="profile-info-card-viewAll-dashboard">
                <a href="default.asp" target="_blank">
>>>>>>> a9475e3000df477a673d2fb6660090994aec51a7
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
<<<<<<< HEAD
              {expenses === null ? (
                <p></p>
              ) : expenses.length === 0 ? (
                <p>No user available</p>
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
=======
              <div className="profile-info-card-row-dashboard">
                <div style={{ fontSize: "18px" }}>ID1</div>
                <div>04/05/2026</div>
                <div>Company1</div>
                <div style={{ fontSize: "18px" }}>10,000 CND</div>
              </div>
              <div className="profile-info-card-row-dashboard">
                <div style={{ fontSize: "18px" }}>ID2</div>
                <div>04/05/2026</div>
                <div>Company2</div>
                <div style={{ fontSize: "18px" }}>10,000 CND</div>
              </div>
              <div className="profile-info-card-row-dashboard">
                <div style={{ fontSize: "18px" }}>ID3</div>
                <div>04/05/2026</div>
                <div>Company3</div>
                <div style={{ fontSize: "18px" }}>10,000 CND</div>
              </div>
              <div className="profile-info-card-viewAll-dashboard">
                <a href="default.asp" target="_blank">
>>>>>>> a9475e3000df477a673d2fb6660090994aec51a7
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
