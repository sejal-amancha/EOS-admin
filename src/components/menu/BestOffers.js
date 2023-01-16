import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { deleteOfferStart, loadOffersStart } from "../../redux/Actions/offerActions";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

const BestOffers = () => {
       
    let serviceData = []
    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);

    const offerss = useSelector((state) => state?.offers?.offers?.bestoffersData); 
    const [offers, setOffers] = useState();
    const [deleteOffersDialog, setDeleteOffersDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        dispatch(loadOffersStart());
    }, []);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteOffersDialog = () => {
        setDeleteOffersDialog(false);
    };

    const confirmDeleteoffers = (offers) => {
        setOffers(offers);
        setDeleteOffersDialog(true);
    };

    const deleteoffers = () => {
        setOffers(offers);
        dispatch(deleteOfferStart(offers));
        setDeleteOffersDialog(false); 
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-offer/`}>
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
                <Link to={`/offer-info/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteoffers(rowData)} />   
                <Link to={`/update-offer/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-help mt-2 mr-2" />
                </Link>
                {/* <Link to={`/service-categories-info/${rowData.id}`}>
                    <Button icon="pi pi-list" className="p-button-rounded p-button-warning mt-2 mr-2" label="show Category" />
                </Link> */}
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">All Offers</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteProfessionalDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteOffersDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteoffers} />
        </>
    );

    return (
        <div className="grid crud-demo">
        <div className="col-12">
            <div className="card" style={{ margin: "1%" }}>
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                {/* {offerss?.map((serviceList) => {
                        if (serviceList.status === 1) {
                            serviceData.push(serviceList);
                        }
                    })} */}

                        {!offerss ? (
                             <ProgressSpinner style={{display:'flex', justifyContent:'center'}} />
                        ) : (
                            <DataTable
                            ref={dt}
                            value={offerss}
                            dataKey="id"
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 25]}
                            className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} offers"
                            globalFilter={globalFilter}
                            emptyMessage="No Offers found."
                            header={header}
                            responsiveLayout="scroll">
                            
                                <Column style={{ display: "none" }} field="id" header="ID" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                <Column field="bestoffersName" header="Offer Name" sortable headerStyle={{ width: "16%", minWidth: "10rem" }}></Column>
                                <Column field="description" header="Description" sortable headerStyle={{ width: "16%", minWidth: "10rem" }}></Column>
                                <Column field="image" header="Image" body={imageBodyTemplate} headerStyle={{ width: "10%", minWidth: "8rem" }}></Column>
                                <Column field="price" header="Price" sortable headerStyle={{ width: "10%", minWidth: "8rem" }}></Column>
                                <Column body={actionBodyTemplate}></Column>
                            </DataTable>
                        )}

               

                    <Dialog visible={deleteOffersDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProfessionalDialogFooter} onHide={hideDeleteOffersDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {offers && (
                                <span>
                                    Are you sure you want to delete <b>{offers.bestoffersName}</b>?
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

export default React.memo(BestOffers, comparisonFn);
