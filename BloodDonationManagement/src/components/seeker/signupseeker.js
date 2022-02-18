import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpSeeker() {
  toast.configure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    const url = "http://localhost:64702/api/Values/SeekerRegistration";
    const data = {
      UserName: username,
      Password: password,
      UserAddress: address,
      UserEmail: email,
      UserPhone: phone,
      Type: "SEEKER",
    };
    axios
      .post(url, data)
      .then((json) => setResponse(json))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (response) {
      clear(); 
      toast.success(response.data.responseMessage);           
    }
  }, [response]);

  const clear = () => {
    document.getElementById("seeker-registration").reset();
  }

  return (
    <form onSubmit={handleSubmit} id="seeker-registration">
      <div className="container" style={{ width: "50%", marginTop: "50px" }}>
        <h3>Sign Up</h3>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-3">
            <label>Username</label>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="User name"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              defaultValue={username}
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
              defaultValue={password}
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
              defaultValue={password}
            />
          </div>
        </div>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-3">
            <label>Address</label>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              defaultValue={address}
            />{" "}
          </div>
        </div>
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
              defaultValue={email}
            />
          </div>
        </div>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-3">
            <label>Phone</label>
          </div>
          <div className="col-md-6">
            <input
              type="Phone"
              className="form-control"
              placeholder="Enter Phone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              defaultValue={phone}
            />
          </div>
        </div>
        <div className="row">
        <div className="col-md-3"></div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary btn-block">
              Sign Up
            </button>
          </div>
          <div className="col-md-1">
            <button type="reset" className="btn btn-danger btn-block">
              Reset
            </button>{" "}
          </div>
          <div className="col-md-3">
            <a href="/login" className="btn btn-primary btn-block">
              Login
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
