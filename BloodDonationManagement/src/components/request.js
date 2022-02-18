import axios from "axios";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";

export default function Request() {
  toast.configure();
  const history = useHistory();
  const [request, setRequest] = useState("");
  const [response, setResponse] = useState("");

  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  let query = useQuery();

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    if (request === "") {
      toast.warn("Please enter the request details");
    }
    else {
      const url = "http://localhost:64702/api/Values/NewRequest";
      const data = {
        RequestContent: request,
        RequestType: query.get("ty"),
        RequestFrom: localStorage.getItem("LoggedInUser"),
        RequestStatus: "OPEN"
      };
      axios
        .post(url, data)
        .then((json) => {
          if (json.data.responseCode === 200) {
            toast.success(json.data.responseMessage);
            history.push(dashboardUrl(localStorage.getItem("UserType")));
          } else {
            toast.error(json.data.responseMessage);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const dashboardUrl = (type) => {
    //console.log(type)
    if (type === 'DONOR')
      return '/donorDashboard'
    if (type === 'SEEKER')
      return '/seekerDashboard'
    if (type === 'HOSPITAL')
      return '/hospitalDashboard'
    if (type === 'BLOODBANK')
      return '/bloodBankDashboard'
  }

  return (
    <form onSubmit={handleSubmit}>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            Logged as :<b> {localStorage.getItem("LoggedInUser")}</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />{" "}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href={dashboardUrl(localStorage.getItem("UserType"))}>Dashboard</Nav.Link>
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container" style={{ width: "50%", marginTop: "50px" }}>
        <h3>Make New Request</h3>
        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-md-3">
            <label>Request </label>
          </div>
          <div className="col-md-9">
            <textarea
              type="text"
              className="form-control"
              placeholder="Enter Request"
              rows={7}
              cols={7}
              onChange={(e) => {
                setRequest(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>{" "}
          </div>
          <div className="col-md-1">
            <button type="reset" className="btn btn-danger btn-block">
              Reset
            </button>{" "}
          </div>
          <div className="col-md-8"></div>
        </div>
      </div>
    </form>
  );
}
