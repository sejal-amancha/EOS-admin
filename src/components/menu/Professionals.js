import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadProfessionalsStart, deleteProfessionalStart } from "../../redux/Actions/professionlasActions";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

const Professionals = () => {
        
    let professionalData = [];
    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const professionalss = useSelector((state) => state?.professional?.professional?.postData);
   
    const [professional, setProfessional] = useState();
    const [deleteProfessionalDialog, setDeleteProfessionalDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        // setloaderState(true);
        dispatch(loadProfessionalsStart());
        // if(professionalssStatus == 200) {
        //     setloaderState(false)
        // }
    }, []);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteProfessionalDialog = () => {
        setDeleteProfessionalDialog(false);
    };

    const confirmDeleteProfessional = (professional) => {
        setProfessional(professional);
        setDeleteProfessionalDialog(true);
    };

    const deleteProfessional = () => {
        setProfessional(professional);
        dispatch(deleteProfessionalStart(professional));
        setDeleteProfessionalDialog(false); 
    };

    // const leftToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <div className="my-2">
    //                 <Link to={`/addnew-category/`}>
    //                     <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
    //                 </Link>
    //             </div>
    //         </React.Fragment>
    //     );
    // };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        );
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                {/* <Link to={`/update-category/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mt-2 mr-2" />
                </Link> */}
                <Link to={`/professional-info/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteProfessional(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">All Professionals</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteProfessionalDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProfessionalDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProfessional} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" style={{ margin: "1%" }}>
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                    {!professionalss ? (
                         <ProgressSpinner style={{display:'flex', justifyContent:'center'}} /> ) : (
                        // {professionalss?.map((professionalList) => {
                        //     if (professionalList.status === 1) {
                        //         professionalData.push(professionalList);
                        //     }
                        // })}
                        <DataTable
                            ref={dt}
                            value={professionalss}
                            dataKey="id"
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 25]}
                            className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} professionals"
                            globalFilter={globalFilter}
                            emptyMessage="No Professionals found."
                            header={header}
                            responsiveLayout="scroll" >
    
                            <Column style={{ display: "none" }} field="id" header="ID" sortable headerStyle={{ width: "10%", minWidth: "15rem" }}></Column>
                            <Column field="name" header="Name" sortable headerStyle={{ width: "10%", minWidth: "20rem" }}></Column>
                            <Column field="professional" header="Profession" sortable headerStyle={{ width: "10%", minWidth: "20rem" }}></Column>
                            <Column field="phonenumber" header="Contact Number" sortable headerStyle={{ width: "10%", minWidth: "20rem" }}></Column>
                            <Column body={actionBodyTemplate}></Column>
                        </DataTable>

                    ) }

                    
                    <Dialog visible={deleteProfessionalDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProfessionalDialogFooter} onHide={hideDeleteProfessionalDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {professional && (
                                <span>
                                    Are you sure you want to delete <b>{professional.name}</b>?
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

export default React.memo(Professionals, comparisonFn);
