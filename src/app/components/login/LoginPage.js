import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./LoginPage.css";
import LoginWithPassword from "./LoginWithPassword";
import LoginWithOTP from "./LoginWithOtp";
import uiImg from "../../../img/login_img.png";

const LoginPage = ({ history, location }) => {
  const mode = location.search ? location.search.split("=")[1] : "/";

  return (
    <Container>
      <Row>
        <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3">
          {mode === "otp" ? (
            <LoginWithOTP history={history} />
          ) : (
            <LoginWithPassword history={history} />
          )}
        </Col>

        <Col lg={8} md={6} sm={12}>
          <img className="w-100" src={uiImg} alt="" />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
