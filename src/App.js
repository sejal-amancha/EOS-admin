import React from "react";
import AdminDashboard from './components/AdminDashboard';
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
    return (
        <div>
            {sessionStorage.getItem("ADMIN_TOKEN") ? (
                    <Redirect to="/admindashboard" />
                ) : (
                    <Redirect to="/login" />
                )}
            <Switch>
                <Route path="/forgot-password">
                    <ForgotPassword />
                </Route>
                <Route path="/changePass">
                    <ChangePassword />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    <AdminDashboard />
                </Route>
            </Switch>
        </div>
    );
};

export default App;


