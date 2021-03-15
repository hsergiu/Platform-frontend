import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import AuthService from "./authService";
import Login from "./login";
import Home from "./home/home";
import PatientContainer from "./content/patient-container";
import DoctorContainer from "./content/doctor-container";
import ProfileContainer from "./content/profile-container";
import CaregiverContainer from "./content/caregiver-container";

const App = () => {
    const [showPatientBoard, setShowPatientBoard] = useState(false);
    const [showCaregiverBoard, setShowCaregiverBoard] = useState(false);
    const [showDoctorBoard, setShowDoctorBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowPatientBoard(user.role.includes("patient"));
            setShowCaregiverBoard(user.role.includes("caregiver"));
            setShowDoctorBoard(user.role.includes("doctor"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>

                    {showPatientBoard && (
                        <li className="nav-item">
                            <Link to={"/patient"} className="nav-link">
                                Patient Board
                            </Link>
                        </li>
                    )}

                    {showCaregiverBoard && (
                        <li className="nav-item">
                            <Link to={"/caregiver"} className="nav-link">
                                Caregiver Board
                            </Link>
                        </li>
                    )}

                    {showDoctorBoard && (
                        <li className="nav-item">
                            <Link to={"/doctor"} className="nav-link">
                                Doctor Board
                            </Link>
                        </li>
                    )}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        {showPatientBoard && (

                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>

                        )}
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                    </div>
                )}
            </nav>

            <div>
                <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/patient" component={showPatientBoard ? PatientContainer : Home} />
                    <Route path="/caregiver" render={(props)=>{return showCaregiverBoard ? <CaregiverContainer cuser = {AuthService.getCurrentUser().username}/> : <Home/>;}} />
                    <Route path="/doctor" component={showDoctorBoard ? DoctorContainer : Home} />
                    <Route path="/profile" render={(props)=>{return showPatientBoard ? <ProfileContainer cuser = {AuthService.getCurrentUser().username}/> : <Home/>;}} />
                </Switch>
            </div>
        </div>
    );
};

export default App;
