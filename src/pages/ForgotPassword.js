import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { adminForgotPassStart } from "../redux/Actions/actions";
import Swal from "sweetalert2";


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
  });

const ForgotPassword = () => {
    const admin = useSelector((state) => state?.forgotPass?.forgotPass);

    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
    });

    useEffect(() => {
        if(data.email){
            dispatch(adminForgotPassStart(data));       
        }
    }, [submitted]);

    

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

        if(data.email) {
            if (admin.message === 'invalid Email') {
                Toast.fire({
                    icon: "error",
                    title: admin.message,
                });
            }
             else {
                Toast.fire({
                    icon: "success",
                    title: admin.message,
                });
            }
        }
    };

      
  return (
    <div className="flex justify-content-center border-round mt-8">
            <div className="card w-30rem ">
                <div className="flex justify-content-center">
                    <img src='assets/layout/images/logo.png' alt="logo"  style={{ width:'50%'}}/>
                </div>

                <h3 className="text-center mb-8">FORGOT PASSWORD</h3>
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="grid p-fluid">
                       
                        <div className="col-12 md:col-12">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText 
                                className={classNames({ "p-invalid": submitted && !data.email && !validateEmail(data.email) })} 
                                id="email" 
                                name="email" 
                                label="Email Address" 
                                placeholder="test@test.com" 
                                value={data.email} 
                                onChange={handleChange}
                            />
                        </div>
                        {submitted && !data.email && <small className="p-error">Email is required.</small> || submitted && !validateEmail(data.email) && <small className="p-error">Please Enter Valid Email!</small>}
                    </div>
                    </div>
                    <div className="text-center mt-3 mb-1">
                        <label> Link will be valid for only an hour</label>
                    </div>
                    <div className="text-center mb-5">
                        <label>Kindly check inside the <b>spam</b></label>
                    </div>
                    <div className="formgrid grid">          
                        <div className="field col">
                             <Button label="Verify" icon="pi pi-check" className="p-button-success mr-2 mb-1"/>
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                        <Link to={`/login`}>
                            <Button label="Back to LogIn" className="p-button-text" />
                        </Link>
                        </div>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default ForgotPassword
