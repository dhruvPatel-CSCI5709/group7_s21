import React from "react";

import "./Profile.css";
import face from "../../../resources/face.jpg";
import rbcBank from "../../../resources/RBCjpg.jpg";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountBalanceTwoToneIcon from "@material-ui/icons/AccountBalanceTwoTone";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const history = useHistory();

  const routeChange = () => {
    let path = `/deleteProfile`;
    history.push(path);
  };

  return (
    <div>
      <div className="root-profile-container">
        <div className="profile-info-finance-container">
          <div className="profile-info-container">
            <div className="profile-info-left">
              <div className="profile-info-left-image">
                <img className="profile-image" src={face} alt="Your face" />
              </div>

              <div className="profile-info-left-buttons">
                <div
                  className="profile-info-left-button"
                  onClick={(event) => (window.location.href = "/")}
                >
                  <EditIcon style={{ color: "#808080" }} />
                  <div style={{ color: "#808080" }}>Edit</div>
                </div>

                <div
                  className="profile-info-left-button"
                  onClick={(event) => (window.location.href = "/")}
                >
                  <AddCircleOutlineIcon style={{ color: "#4dff4d" }} />
                  <div style={{ color: "#808080" }}>Add</div>
                </div>

                <div className="profile-info-left-button" onClick={routeChange}>
                  <DeleteForeverIcon style={{ color: "#ff4d4d" }} />
                  <div style={{ color: "#808080" }}>Delete </div>
                </div>
              </div>
            </div>
            <div className="profile-info-right">
              <div className="profile-info-right-item">
                <div className="profile-info-right-label">First Name</div>
                <div className="profile-info-right-value">Dhruv</div>
              </div>
              <div className="profile-info-right-item">
                <div className="profile-info-right-label">Last Name</div>
                <div className="profile-info-right-value">Patel</div>
              </div>
              <div className="profile-info-right-item">
                <div className="profile-info-right-label">Date of birth</div>
                <div className="profile-info-right-value">04/11/1997</div>
              </div>
              <div className="profile-info-right-item">
                <div className="profile-info-right-label">Email</div>
                <div className="profile-info-right-value">dh296435@got.com</div>
              </div>
              <div className="profile-info-right-item">
                <div className="profile-info-right-label">Phone number</div>
                <div className="profile-info-right-value">902-483-1246</div>
              </div>
              <div className="profile-info-right-item">
                <div className="profile-info-right-label">Address</div>
                <div className="profile-info-right-value">
                  1803 Gr Street, Halifax, Nova Scotia, B3K 5K3
                </div>
              </div>
            </div>
          </div>
          <div className="finance-info-container">
            <div className="finance-info-card-banks">
              <div className="finance-info-cards">
                <div className="profile-info-card-type">Saved Cards</div>
                <div className="profile-info-card-row">
                  <CreditCardIcon
                    style={{ color: "#6abfd2", fontSize: "30px" }}
                  />
                  <div style={{ fontSize: "18px" }}>XX0579</div>
                  <div>04/05/2026</div>
                  <div
                    className="profile-info-left-button"
                    onClick={(event) => (window.location.href = "/")}
                  >
                    <EditIcon style={{ color: "#808080" }} />
                  </div>
                  <div className="profile-info-left-button">
                    <DeleteForeverIcon style={{ color: "#ff4d4d" }} />
                  </div>
                </div>
                <div className="profile-info-card-row">
                  <CreditCardIcon
                    style={{ color: "#6abfd2", fontSize: "30px" }}
                  />
                  <div style={{ fontSize: "18px" }}>XX0600</div>
                  <div>08/05/2026</div>
                  <div
                    className="profile-info-left-button"
                    onClick={(event) => (window.location.href = "/")}
                  >
                    <EditIcon style={{ color: "#808080" }} />
                  </div>
                  <div className="profile-info-left-button">
                    <DeleteForeverIcon style={{ color: "#ff4d4d" }} />
                  </div>
                </div>
                <div className="profile-info-card-row">
                  <CreditCardIcon
                    style={{ color: "#6abfd2", fontSize: "30px" }}
                  />
                  <div style={{ fontSize: "18px" }}>XX0602</div>
                  <div>11/05/2026</div>
                  <div
                    className="profile-info-left-button"
                    onClick={(event) => (window.location.href = "/")}
                  >
                    <EditIcon style={{ color: "#808080" }} />
                  </div>
                  <div className="profile-info-left-button">
                    <DeleteForeverIcon style={{ color: "#ff4d4d" }} />
                  </div>
                </div>
              </div>
              <div className="finance-info-root-accounts">
                <div className="finance-account-label">
                  <AccountBalanceTwoToneIcon style={{ fontSize: "25px" }} />
                </div>
                <div className="rbc-bank-accounts-list">
                  <div className="rbc-bank-account-container">
                    <div className="bank-primary-account">Primary Account</div>
                    <div className="bank-primary-account-begins">
                      <div className="bank-secondary-list-begins">
                        <div className="bank-account-image">
                          <img
                            className="bank-rbc-image"
                            src={rbcBank}
                            alt="RBC bank"
                          />
                        </div>
                        <div className="bank-details">
                          <div>XXXX0080</div>
                          <div>$1462</div>
                          {/* <DeleteForeverIcon style={{ color: "#ff4d4d" }} /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rbc-bank-account-container">
                    <div className="bank-primary-account">
                      Secondary Accounts
                    </div>
                    <div className="bank-secondary-lists">
                      <div className="bank-secondary-list-begins">
                        <div className="bank-account-image">
                          <img
                            className="bank-rbc-image"
                            src={rbcBank}
                            alt="RBC bank"
                          />
                        </div>
                        <div className="bank-details">
                          <div>XXXX0081</div>
                          <div>$46,612</div>
                          {/* <DeleteForeverIcon style={{ color: "#ff4d4d" }} /> */}
                        </div>
                      </div>
                      <div className="bank-secondary-list-begins">
                        <div className="bank-account-image">
                          <img
                            className="bank-rbc-image"
                            src={rbcBank}
                            alt="RBC bank"
                          />
                        </div>
                        <div className="bank-details">
                          <div>XXXX0082</div>
                          <div>$5,12,462</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
