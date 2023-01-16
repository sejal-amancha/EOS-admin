import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginStart } from "../redux/Actions/actions";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';

const Login = () => {
    const users = useSelector((state) => state?.loginData?.loginData);
    const [submitted, setSubmitted] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });


    // useEffect(() => {
    //     if(submitted){
    //         dispatch(adminLoginStart(data));
    //     }
    // }, [submitted]);
    

    const history = useHistory();
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();  
        setSubmitted(true);
        if (data.email && validateEmail(data.email) && data.password) {
        setData(data)
        dispatch(adminLoginStart(data));
        }
    };

    // useEffect(() => {
    //     if(submitted){
    //         dispatch(adminLoginStart(data));
    //     }
    // }, [submitted]);

    if (users?.message === "Login successful") {
        history.push("/admindashboard");
        window.location.reload();
    }
    return (
        <div className="flex justify-content-center border-round mt-8">
            <div className="card w-30rem ">
                <div className="flex justify-content-center">
                    <img src='assets/layout/images/logo.png' alt="logo"  style={{ width:'50%'}}/>
                </div>

                <h3 className="text-center mb-8">LOG IN</h3>
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Email Address</label>
                        </div>

                        <div className="field col p-input-icon-right">
                            <InputText 
                                className={classNames({ "p-invalid": submitted && !validateEmail(data.email) })} 
                                id="email" 
                                name="email" 
                                label="Email Address" 
                                placeholder="test@test.com" 
                                value={data.email} 
                                onChange={handleChange}
                            />
                            {submitted && !data.email && <small className="p-error">Email is required.</small> || submitted && !validateEmail(data.email) && <small className="p-error">Please Enter Valid Email!</small>}
                        </div>
                       
                    </div>

                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Enter Password</label>
                        </div>

                        <div className="field col">
                            <Password 
                                className={classNames({ "p-invalid": submitted && !data.password })} 
                                id="password" 
                                name="password" 
                                label="password" 
                                type="password" 
                                value={data.password} 
                                onChange={handleChange} 
                                toggleMask 
                                feedback={false} />
                            {submitted && !data.password && <small className="p-error">Password is required.</small>}
                        </div>
                        <div></div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Log In" icon="pi pi-check" className="p-button-success mr-2 mb-1"  />
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                        <Link to={`/forgot-password`}>
                            <Button label="Forgot Password?" className="p-button-text" />
                        </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

