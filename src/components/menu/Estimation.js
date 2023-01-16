import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadEstimationStart } from "../../redux/Actions/estimationActions";
import { ProgressSpinner } from "primereact/progressspinner";

const Estimation = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);

    const estimationss = useSelector((state) => state?.estimations?.estimations?.projectData); 
    const [Estimation, setEstimation] = useState();
    const [deleteEstimationDialog, setDeleteEstimationDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        dispatch(loadEstimationStart());    
    }, []);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteEstimationDialog = () => {
        setDeleteEstimationDialog(false);
    };

    const confirmDeleteEstimation = (Estimation) => {
        setEstimation(Estimation);
        setDeleteEstimationDialog(true);
    };

    const deleteEstimation = async () => {
        setEstimation(Estimation);
        // dispatch(deleteEstimationStart(Estimation.id));
        setDeleteEstimationDialog(false);
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

    // const actionBodyTemplate = (rowData) => {      
    //     return (
    //         <div className="actions">
    //             {/* <Link to={`/Estimation-info/${rowData.id}`}>
    //                 <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
    //             </Link> */}
    //             <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteEstimation(rowData)} />
    //         </div>
    //     );
    // };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">All Estimations</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteEstimationDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEstimationDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteEstimation} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" style={{ margin: "1%" }}>
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                    {!estimationss ? (
                         <ProgressSpinner style={{display:'flex', justifyContent:'center'}} />) : (
                        <DataTable
                        ref={dt}
                        value={estimationss}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} estimations"
                        globalFilter={globalFilter}
                        emptyMessage="No Estimations found."
                        header={header}
                        responsiveLayout="scroll">
                        
                        <Column style={{ display: "none" }} field="id" header="ID" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="name" header="Name" sortable headerStyle={{ width: "12%", minWidth: "8rem" }}></Column>
                        <Column field="message" header="Message" headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="city" header="City" headerStyle={{ width: "10%", minWidth: "8rem" }}></Column>
                        <Column field="email" header="Email Address" headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="phonenumber" header="Contact Number" headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        {/* <Column body={actionBodyTemplate}></Column> */}
                    </DataTable>

                    )}

                       
                    <Dialog visible={deleteEstimationDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteEstimationDialogFooter} onHide={hideDeleteEstimationDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {Estimation && (
                                <span>
                                    Are you sure you want to delete <b>{Estimation.name}</b>?
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

export default React.memo(Estimation, comparisonFn);
