import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadOrdersStart, deleteOrderStart } from "../../redux/Actions/orderActions";
import { Link } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";


const Orders = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const orders =  useSelector((state) => state?.orders?.orders?.OrderData);
    const [Order, setOrder] = useState();
    const [deleteOrderDialog, setDeleteOrderDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        dispatch(loadOrdersStart()); 
    }, []);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteOrderDialog = () => {
        setDeleteOrderDialog(false);
    };

    const confirmDeleteOrder = (Order) => {
        setOrder(Order);
        setDeleteOrderDialog(true);
    };

    const deleteOrder = async () => {
        setOrder(Order);
        dispatch(deleteOrderStart(Order));
        setDeleteOrderDialog(false);
    };

    // const leftToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <div className="my-2">
    //                 <Link to={`/addnew-banner/`}>
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
                {/* <Link to={`/order-info/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link> */}
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteOrder(rowData)} />
            </div>
        );
    };

    const userNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">User Name</span>
                {rowData.User.name}
            </>
        );
    }

    const numberBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Contact Number</span>
                {rowData.User.phonenumber}
            </>
        );
    }

    const catNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category Name</span>
                {rowData.category.categoriesName}
            </>
        );
    }

    const catPriceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category Price</span>
                {rowData.category.price}
            </>
        );
    }

    const productNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Product Name</span>
                {rowData.Product.productName}
            </>
        );
    }

    const locationBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Location</span>
                {rowData.Location.housenumber}, {rowData.Location.landmark}
            </>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">All Orders</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteOrderDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteOrderDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteOrder} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" style={{ margin: "1%" }}>
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                    {!orders ? (
                        <ProgressSpinner style={{display:'flex', justifyContent:'center'}} /> ) : (
                                <DataTable
                                ref={dt}
                                value={orders}
                                dataKey="id"
                                paginator
                                rows={5}
                                rowsPerPageOptions={[5, 10, 25]}
                                className="datatable-responsive"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders"
                                globalFilter={globalFilter}
                                emptyMessage="No Orders found."
                                header={header}
                                responsiveLayout="scroll">
                                
                                <Column style={{ display: 'none' }} field="id" header="ID" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                <Column field="name" body={userNameBodyTemplate} header="User Name" sortable headerStyle={{ width: "10%", minWidth: "8rem" }}></Column>
                                <Column field="phonenumber" body={numberBodyTemplate} header=" User Phone Number" headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                <Column field="categoriesName" body={catNameBodyTemplate} header="Category" headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                <Column field="price" body={catPriceBodyTemplate} header="Category Price" headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                <Column field="productName" body={productNameBodyTemplate} header="Product" headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                                <Column field="housenumber" body={locationBodyTemplate} header="Location" headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
        
                                <Column body={actionBodyTemplate}></Column>
                            </DataTable>
                        )
                    }

                

                    <Dialog visible={deleteOrderDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteOrderDialogFooter} onHide={hideDeleteOrderDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {orders && (
                                <span>
                                    Are you sure you want to delete ?
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

export default React.memo(Orders, comparisonFn);
