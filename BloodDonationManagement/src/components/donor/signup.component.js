import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  toast.configure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let message = " are mandatory fields";
    if (username === "" || password === "" || email === "")
      toast.warn("Username, password, email are mandatory fields");
    else {
      const url = "http://localhost:64702/api/Values/DonorRegistration";
      const data = {
        UserName: username,
        Password: password,
        UserAddress: address,
        UserEmail: email,
        UserPhone: phone,
        Type: type
      };
      axios
        .post(url, data)
        .then((json) => setResponse(json))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (response) {
      clear();
      toast.success(response.data.responseMessage);
    }
  }, [response]);

  const clear = () => {
    document.getElementById("donor-registration").reset();
  }

  return (
    <form onSubmit={handleSubmit} id="donor-registration">
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
            <label>UserType</label>
          </div>
          <div className="col-md-6">
          <select
              className="form-select"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="0">- Select Type -</option>
              <option value="DONOR">DONOR</option>
              <option value="SEEKER">SEEKER</option>
              <option value="HOSPITAL">HOSPITAL</option>
              <option value="BLOODBANK">BLOOD BANK</option>
            </select>
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
            <a href="/" className="btn btn-primary btn-block">
              Home
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
