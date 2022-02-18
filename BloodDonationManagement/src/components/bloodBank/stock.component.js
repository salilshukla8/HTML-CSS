import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Stock() {
  toast.configure();
  const [bloodGroup, setBloodGroup] = useState("");
  const [unit, setUnit] = useState("");
  const [stockData, setStockData] = useState([]);
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    if(bloodGroup===""||unit==="")
    {
      toast.warn("Please fill these field");
    }
    const url = "http://localhost:64702/api/Values/AddStock";
    const data = {
      BloodGroup: bloodGroup,
      Unit: unit,
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

  useEffect(() => {
    const url = "http://localhost:64702/api/Values/AllStock";
    axios
      .get(url)
      .then((json) => {
        if (json) {
          setStockData(json.data.lstStock);
        }
      })
      .catch((error) => console.log(error));
  }, [stockData]);

  const clear = () => {
    document.getElementById("bb-stock").reset();
  };

  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/donorDashboard">
            Logged as :<b> {localStorage.getItem("LoggedInUser")}</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />{" "}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/bloodBankDashboard">Dashboard</Nav.Link>
              <Nav.Link href="/request?ty=BLOODBANK">Make Request</Nav.Link>
              <Nav.Link href="/campaign">Add Campaign</Nav.Link>
              <Nav.Link href="/stock">Update Stock</Nav.Link>
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>
      <form onSubmit={handleSubmit} id="bb-stock">
        <div className="container" style={{ width: "50%", marginTop: "50px" }}>
          <h3>Add Stock</h3>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-md-3">
              <label>Blood Group</label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={(e) => {
                  setBloodGroup(e.target.value);
                }}
                defaultValue={bloodGroup}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-md-3">
              <label>Unit</label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Unit"
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
                defaultValue={unit}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>
            <div className="col-md-1">
              <button type="reset" className="btn btn-danger btn-block">
                Reset
              </button>{" "}
            </div>
          </div>
        </div>
      </form>
      <br></br>
      <div className="row">
        <h3>Stock Details</h3>
        <hr></hr>
        <div className="col-md-12">
          <table
            class="table table-striped"
            style={{ width: "70%", margin: "0 auto" }}
          >
            <thead class="thead-dark">
              <tr>
                <th>Sr. No</th>
                <th>Blood Group</th>
                <th>Unit</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stockData &&
                stockData.map((req, index) => {
                  return (
                    <tr>
                      <td> {index + 1}</td>
                      <td>{req.BloodGroup}</td>
                      <td>{req.Unit}</td>
                      <td>{req.InsertedON}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}
