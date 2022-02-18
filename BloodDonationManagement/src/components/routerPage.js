import React from 'react'
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom'
import Home from './home'
import Login from './login.component'
import SignUp from './donor/signup.component'
import donorDashboard from './donor/donor.dashboard';
import Request from './request';
import SeekerDashboard from './seeker/seeker.dashboard';
import SignUpSeeker from './seeker/signupseeker';
import HospitalDashboard from './hospital/hospital.dashboard'
import BloodBankDashboard from './bloodBank/bloodbank.dashboard';
import Campaign from './bloodBank/campaign.component'
import Stock from './bloodBank/stock.component'

export default function RouterPage() {
  return (
    <div>
      <Router>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/seekersignup" component={SignUpSeeker}/>
              <Route path="/donorDashboard" component={donorDashboard} />
              <Route path="/request" component={Request} />
              <Route path="/seekerDashboard" component={SeekerDashboard} />
              <Route path="/hospitalDashboard" component={HospitalDashboard} />
              <Route path="/bloodBankDashboard" component={BloodBankDashboard} />
              <Route path="/campaign" component={Campaign} />
              <Route path="/stock" component={Stock} />
          </Switch>
      </Router>
    </div>
  )
}
