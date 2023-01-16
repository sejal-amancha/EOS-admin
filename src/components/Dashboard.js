import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadUsersStart } from '../redux/Actions/actions';
import { loadProfessionalsStart } from "../redux/Actions/professionlasActions";
import { loadOrdersStart } from "../redux/Actions/orderActions";
import { loadServicesStart } from "../redux/Actions/serviceActions";


const Dashboard = (props) => {
   
    const dispatch = useDispatch();
    const [lineOptions, setLineOptions] = useState(null);
    const users = useSelector((state) =>  state?.users?.users?.postData);
    const professionals = useSelector((state) => state?.professional?.professional?.postData);
    const orders =  useSelector((state) => state?.orders?.orders?.OrderData);
    const servicess = useSelector((state) =>  state?.serviceData?.serviceData?.serviceData);
   
   
    useEffect(() => {
        dispatch(loadUsersStart());
    }, []);
    useEffect(() => {
        dispatch(loadProfessionalsStart());
    }, []);
    useEffect(() => {
        dispatch(loadOrdersStart());
    }, []);
    useEffect(() => {
        dispatch(loadServicesStart());
    }, []);

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };
        setLineOptions(lineOptions)
    }


    useEffect(() => {
        if (props.colorMode === 'light') {
            applyLightTheme(); 
        } else {
            applyDarkTheme();
        }
    }, [props.colorMode]);

    return (
        <div>
            <div className="grid " style={{ overflow: "hidden" }}>

                <div className="col-12 lg:col-6 xl:col-3">
                <Link to="/admindashboard/users" >
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">USERS</span>
                                <div className="text-900 font-medium text-xl">{users && users.length }</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="pi pi-users text-blue-500 text-xl"/>
                            </div>
                        </div>
                        {/* <span className="text-green-500 font-medium">24 new </span>
                        <span className="text-500">since last visit</span> */}
                    </div>
                </Link>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                <Link to="/admindashboard/professionals" >
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">PROFESSIONALS</span>
                                <div className="text-900 font-medium text-xl">{professionals && professionals.length }</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="pi pi-fw pi-star-fill text-orange-500 text-xl"/>
                            </div>
                        </div>
                        {/* <span className="text-green-500 font-medium">%52+ </span>
                        <span className="text-500">since last week</span> */}
                    </div>
                </Link>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                <Link to="/admindashboard/orders" >
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">ORDERS</span>
                                <div className="text-900 font-medium text-xl">{orders && orders.length}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="pi pi-money-bill text-cyan-500 text-xl"/>
                            </div>
                        </div>
                        {/* <span className="text-green-500 font-medium">520  </span>
                        <span className="text-500">newly registered</span> */}
                    </div>
                </Link>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                <Link to="/admindashboard/services" >
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">SERVICES</span>
                                <div className="text-900 font-medium text-xl">{servicess && servicess.length}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="pi pi-tags text-purple-500 text-xl"/>
                            </div>
                        </div>
                        {/* <span className="text-green-500 font-medium">85 </span>
                        <span className="text-500">responded</span> */}
                    </div>
                </Link>
                </div>    
            </div>

            <div className="card align-items-center justify-content-center flex mt-3">
                <img src={"assets/layout/images/banner.png"} alt="logo" height={'100%'} width={'100%'} className="align-items-center" /> 
            </div>
            
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return (prevProps.location.pathname === nextProps.location.pathname) && (prevProps.colorMode === nextProps.colorMode);
};

export default React.memo(Dashboard, comparisonFn);                                                                     
