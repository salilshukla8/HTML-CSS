import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  toast.configure();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:64702/api/Values/Login";
    const data = {
      UserEmail: email,
      Password: password,
      Type: localStorage.getItem("UserType"),
    };
    axios
      .post(url, data)
      .then((json) => {
        if (json.data.responseCode === 200) {
          setResponse(json);
          localStorage.setItem("LoggedInUser", email);
          if (localStorage.getItem("UserType") === "DONOR")
            history.push("/donorDashboard");
          if (localStorage.getItem("UserType") === "SEEKER")
            history.push("/seekerDashboard");
          if (localStorage.getItem("UserType") === "HOSPITAL")
            history.push("/hospitalDashboard");
          if (localStorage.getItem("UserType") === "BLOODBANK")
            history.push("/bloodBankDashboard");
        } else {
          toast.error(json.data.responseMessage);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container" style={{ width: "50%", marginTop: "50px" }}>
        <h3>Sign In</h3>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-3">
            <label>Email address</label>
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-3">
            <label>Password</label>
          </div>
          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>{" "}
          </div>
          <div className="col-md-1">
            <button type="reset" className="btn btn-danger btn-block">
              Reset
            </button>{" "}
          </div>
          <div className="col-md-3">
            <a href="/signup" className="btn btn-primary btn-block">
              Registration
            </a>
          </div>
          <div className="col-md-3">
            <a href="/" className="btn btn-primary btn-block">
              Back to Home
            </a>
          </div>
          <div className="col-md-3">
          
          </div>
        </div>
      </div>
    </form>
  );
}
