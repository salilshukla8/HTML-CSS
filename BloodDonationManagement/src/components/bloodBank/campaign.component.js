import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Campaign() {
  toast.configure();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [campaignDate, setCampaignDate] = useState("");
  const [response, setResponse] = useState("");
  const [campaignData, setCampaignData] = useState([]);

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    let message = " are mandatory fields";
    if (name === "" || location === "" || campaignData == "")
      toast.warn("Mandatory field");
    else {
      const url = "http://localhost:64702/api/Values/AddCampaign";
      const data = {
        Name: name,
        Location: location,
        CampaignDate: campaignDate
      };
      axios
        .post(url, data)
        .then((json) => setResponse(json))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    const url = "http://localhost:64702/api/Values/AllCampaign";
    axios
      .get(url)
      .then((json) => {
        if (json) {
          setCampaignData(json.data.lstCampaign);
        }
      })
      .catch((error) => console.log(error));
  }, [campaignData]);

  useEffect(() => {
    if (response) {
      clear();
      toast.success(response.data.responseMessage);
    }
  }, [response]);

  const clear = () => {
    document.getElementById("bb-campaign").reset();
  }

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
      <form onSubmit={handleSubmit} id="bb-campaign">
        <div className="container" style={{ width: "50%", marginTop: "50px" }}>
          <h3>Add New Campaign</h3>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-md-3">
              <label>Name</label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                defaultValue={name}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-md-3">
              <label>Location</label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                defaultValue={location}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-md-3">
              <label>Campaign Date</label>
            </div>
            <div className="col-md-6">
              <input
                type="date"
                className="form-control"
                placeholder="Date"
                onChange={(e) => {
                  setCampaignDate(e.target.value);
                }}
                defaultValue={campaignDate}
              />{" "}
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
        <h3>Campaign Details</h3>
        <hr></hr>
        <div className="col-md-12">
          <table
            class="table table-striped"
            style={{ width: "70%", margin: "0 auto" }}
          >
            <thead class="thead-dark">
              <tr>
                <th>Sr. No</th>
                <th>Name</th>
                <th>Location</th>
                <th>Campaign Date</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {campaignData &&
                campaignData.map((req, index) => {
                  return (
                    <tr>
                      <td> {index + 1}</td>
                      <td>{req.Name}</td>
                      <td>{req.Location}</td>
                      <td>{req.CampaignDate}</td>
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
