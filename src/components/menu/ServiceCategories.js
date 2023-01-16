import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from 'primereact/inputswitch'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteCategoryStart, loadCategoriesStart } from "../../redux/Actions/categoryActions";
import { ProgressSpinner } from "primereact/progressspinner";
import { Link } from "react-router-dom";

const ServiceCategories = () => {
   
    let categoryData = []
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams(); 
    
    const dt = useRef(null);
    const categoriess = useSelector((state) => state?.categories?.categories?.categoriesData?.categories);
    const [categories, setCategories] = useState();
    const [deletecategoriesDialog, setDeletecategoriesDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        dispatch(loadCategoriesStart(id));
    }, []);

    const gotoPrevious = () => {
        history.goBack();
    };

   
    const hideDeletecategoriesDialog = () => {
        setDeletecategoriesDialog(false);
    };

    const confirmDeletecategories = (categories) => {
        setCategories(categories);
        setDeletecategoriesDialog(true);
    };

    const deletecategories = () => {
        setCategories(categories);
        dispatch(deleteCategoryStart(categories));
        setDeletecategoriesDialog(false); 
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-category/${id}`}>
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
                <Link to={`/update-service-category/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-help mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeletecategories(rowData)} />
                <Link to={`/category-info/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>               
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">All Categoies</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteProfessionalDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletecategoriesDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletecategories} />
        </>
    );

    return (
        <div className="grid crud-demo">
        <div className="col-12">
            <div className="card" style={{ margin: "1%" }}>
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                {/* {categoriess?.map((catList) => {
                        if (catList.status === 1) {
                            categoryData.push(catList);
                        }
                    })} */}

                    {!categoriess ? (
                         <ProgressSpinner style={{display:'flex', justifyContent:'center'}} />
                    ) : (
                        <DataTable
                        ref={dt}
                        value={categoriess}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories"
                        globalFilter={globalFilter}
                        emptyMessage="No Categories found."
                        header={header}
                        responsiveLayout="scroll">
                        
                            <Column style={{ display: "none" }} field="id" header="ID" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                            <Column field="categoriesName" header="Category Name" sortable headerStyle={{ width: "18%", minWidth: "15rem" }}></Column>
                            <Column field="image" header="Image" body={imageBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                            {/* <Column field="status" header="Description" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column> */}
                            <Column field="price" header="Price" sortable headerStyle={{ width: "10%", minWidth: "8rem" }}></Column>
                            <Column body={actionBodyTemplate}></Column>
                        </DataTable>
                    )}
                 
                    <Dialog visible={deletecategoriesDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProfessionalDialogFooter} onHide={hideDeletecategoriesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {categories && (
                                <span>
                                    Are you sure you want to delete <b>{categories.categoriesName}</b>?
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

export default React.memo(ServiceCategories, comparisonFn);
