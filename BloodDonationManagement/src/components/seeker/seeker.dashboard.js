import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function SeekerDashboard() {
  const [requestData, setRequestData] = useState([]);
  const [donorData, setDonorData] = useState([]);
  const [bloodBankData, setBloodBankData] = useState([]);
  const [searchDonor, setSearchDonor] = useState([]);
  const [searchBB, setSearchBB] = useState([]);
  
  const handleSearchDonorChange = (e) => {
    debugger;
    //e.preventDefault();
    const url = "http://localhost:64702/api/Values/DonorList";
    const data = {
      Type: "DONOR",
      UserName: searchDonor,
    };
    axios
      .post(url, data)
      .then((json) => {
        if (json) {
          setDonorData(json.data.lstDonors);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSearchBBChange = (e) => {
    debugger;
    //e.preventDefault();
    const url = "http://localhost:64702/api/Values/BloodBankList";
    const data = {
      Name: searchBB,
    };
    axios
      .post(url, data)
      .then((json) => {
        if (json) {
          setBloodBankData(json.data.lstBloodBanks);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const url = "http://localhost:64702/api/Values/AllRequest";
    const data = {
      RequestType: localStorage.getItem("UserType"),
      RequestFrom: localStorage.getItem("LoggedInUser"),
    };
    axios
      .post(url, data)
      .then((json) => {
        if (json) {
          setRequestData(json.data.lstRequest);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const url = "http://localhost:64702/api/Values/BloodBankList";
    const data = {      
    };
    axios
      .post(url, data)
      .then((json) => {
        if (json) {
          setBloodBankData(json.data.lstBloodBanks);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const url = "http://localhost:64702/api/Values/DonorList";
    const data = {
      Type: "DONOR",
    };
    axios
      .post(url, data)
      .then((json) => {
        if (json) {
          setDonorData(json.data.lstDonors);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  // const logout = () => {
  //   localStorage.removeItem("UserType");
  //   localStorage.removeItem("LoggedInUser");
  //   history.push("/");
  // };

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
              <Nav.Link href="/seekerDashboard">Dashboard</Nav.Link>
              <Nav.Link href="/request?ty=SEEKER">Make Request</Nav.Link>
              {/* <Nav.Link href="/donorList">Search Donor</Nav.Link>
              <Nav.Link href="/bloodBankList">Search Blood Bank</Nav.Link> */}
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>
      <div className="container">
        <div className="row">
          <h3>Request Details</h3>
          <hr></hr>
          <div className="col-md-12">
            <table
              class="table  table-striped table-hover"
              style={{ width: "70%", margin: "0 auto" }}
            >
              <thead class="thead-dark">
                <tr>
                  <th>Sr. No</th>
                  <th>Request Content</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {requestData &&
                  requestData.map((req, index) => {
                    return (
                      <tr>
                        <td> {index + 1}</td>
                        <td>{req.RequestContent}</td>
                        <td>{req.RequestStatus}</td>
                        <td>{req.InsertedON}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-12">
            <h3>Donor Details</h3>
            <hr></hr>
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-2">Search By Donor</div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Enter Donor username"
              className="form-control"
              onChange={(e) => setSearchDonor(e.target.value)}
            ></input>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary"
              onClick={() => handleSearchDonorChange()}
            >
              Search
            </button>
          </div>
          <div className="col-md-1"></div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-md-12">
            <table
              class="table  table-striped table-hover"
              style={{ width: "70%", margin: "0 auto" }}
            >
              <thead class="thead-dark">
                <tr>
                  <th>Sr. No</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {donorData &&
                  donorData.map((req, index) => {
                    return (
                      <tr>
                        <td> {index + 1}</td>
                        <td>{req.UserName}</td>
                        <td>{req.UserEmail}</td>
                        <td>{req.UserPhone}</td>
                        <td>{req.UserAddress}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-12">
            <h3>Blood Bank Details</h3>
            <hr></hr>
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-2">Search By Blood Bank</div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Enter Blood Bank"
              className="form-control"
              onChange={(e) => setSearchBB(e.target.value)}
            ></input>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary"
              onClick={() => handleSearchBBChange()}
            >
              Search
            </button>
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <hr></hr>
            <div className="col-md-12">
              <table
                class="table  table-striped table-hover"
                style={{ width: "70%", margin: "0 auto" }}
              >
                <thead class="thead-dark">
                  <tr>
                    <th>Sr. No</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Phone</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodBankData &&
                    bloodBankData.map((req, index) => {
                      return (
                        <tr>
                          <td> {index + 1}</td>
                          <td>{req.Name}</td>
                          <td>{req.Location}</td>
                          <td>{req.Phone}</td>
                          <td>{req.Address}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
