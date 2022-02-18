import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  toast.configure();
  const [type, setType] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('UserType', type);
    if (type === 'DONOR' || type === 'SEEKER' || type === 'BLOODBANK' || type === 'HOSPITAL') {
      history.push('/login');

    }
    else {
      toast.warn("please select user type");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="container" style={{ width: "50%", marginTop: "100px" }}>
        <div className="row" style={{ marginBottom: "70px" }}>
          <div className="cold-md-12">
            <h1>Blood Donation Management System</h1>
            {/* <br></br>
          <a style={{ color: "white" }} href="/">
            Home{"   "}|
          </a>
          {"   "}
          <a style={{ color: "white" }} href="/login.component">
            Login{"   "}|
          </a>
          {"   "}
          <a style={{ color: "white" }} href="/donor/signup.component">
            Sign UP
          </a> */}
          </div>
        </div>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-2"></div>
          <div className="col-md-2">
            <label>Select Type</label>
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
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-1">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ width: "200px" }}>
              Submit
            </button>{" "}
          </div> 
          <div className="col-md-5"></div>
        </div>
      </div>
    </form>
  );
}
