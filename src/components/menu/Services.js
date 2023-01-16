import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadServicesStart,deleteServicesStart } from "../../redux/Actions/serviceActions";
import { Link } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

const Services = () => {
       
    let serviceData = []
    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);

    const servicess = useSelector((state) => state?.serviceData?.serviceData?.serviceData);
    const [services, setServices] = useState();
    const [deleteServicesDialog, setDeleteServicesDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        dispatch(loadServicesStart());
    }, []);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteServicesDialog = () => {
        setDeleteServicesDialog(false);
    };

    const confirmDeleteServices = (services) => {
        setServices(services);
        setDeleteServicesDialog(true);
    };

    const deleteServices = () => {
        setServices(services);
        dispatch(deleteServicesStart(services));
        setDeleteServicesDialog(false); 
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-service/`}>
                        <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                    </Link>
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`${rowData.image}`} alt={rowData.image} className="shadow-2" width="80" />
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {      
        return (
            <div className="actions">
                <Link to={`/service-info/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteServices(rowData)} />   
                <Link to={`/update-service/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-help mt-2 mr-2" />
                </Link>
                <Link to={`/service-categories-info/${rowData.id}`}>
                    <Button icon="pi pi-list" className="p-button-rounded p-button-warning mt-2 mr-2" label="show Category" />
                </Link>
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">All Services</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteProfessionalDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteServicesDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteServices} />
        </>
    );

    return (
        <div className="grid crud-demo">
        <div className="col-12">
            <div className="card" style={{ margin: "1%" }}>
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                {/* {servicess?.map((serviceList) => {
                        if (serviceList.status === 1) {
                            serviceData.push(serviceList);
                        }
                    })} */}

                    {!servicess ? (
                            <ProgressSpinner style={{display:'flex', justifyContent:'center'}} />
                        ) : (
                            <DataTable
                            ref={dt}   
                            value={servicess}
                            dataKey="id"
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 25]}
                            className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} services"
                            globalFilter={globalFilter}
                            emptyMessage="No Services found."
                            header={header}
                            responsiveLayout="scroll">
                            
                                <Column style={{ display: "none" }} field="id" header="ID" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                <Column field="servicename" header="Service Name" sortable headerStyle={{ width: "16%", minWidth: "10rem" }}></Column>
                                <Column field="image" header="Service Image"  body={imageBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                <Column body={actionBodyTemplate}></Column>
                            </DataTable>
                        )
                    }

               

                    <Dialog visible={deleteServicesDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProfessionalDialogFooter} onHide={hideDeleteServicesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {services && (
                                <span>
                                    Are you sure you want to delete <b>{services.servicename}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
            </div>
        </div>
        </div>

    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Services, comparisonFn);
