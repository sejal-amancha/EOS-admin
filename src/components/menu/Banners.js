import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { deleteBannersStart, loadBannersStart } from "../../redux/Actions/bannerActions";
import { ProgressSpinner } from "primereact/progressspinner";


const Banners = () => {
    let bannerData = []
   
    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const bannerss = useSelector((state) => state?.banners?.banners?.BannerData)
    const [deleteBannerDialog, setDeleteBannerDialog] = useState(false);
    const [banner, setBanner] = useState();
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
   
    useEffect(() => {
        dispatch(loadBannersStart());
    }, []);


    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteBannerDialog = () => {
        setDeleteBannerDialog(false);
    };

    const confirmDeletebanner = (banner) => {
        setBanner(banner);
        setDeleteBannerDialog(true);
    };

    const deletebanner = () => {
        setBanner(banner);
        dispatch(deleteBannersStart(banner));
        setDeleteBannerDialog(false);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-banner`}>
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

    // const pIdBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Id</span>
    //             {rowData.itemTag}
    //         </>
    //     );
    // };

    // const pnameBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">banner Name</span>
    //             {rowData.itemName}
    //         </>
    //     );
    // };

    // const pDescBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">banner Description</span>
    //             {rowData.description}
    //         </>
    //     );
    // };

    // const categoryIdBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Category ID</span>
    //             {rowData.category.categoryName}
    //         </>
    //     );
    // };

    // const ItemStatusBodyTemplate = (rowData) => {
    //     let statusData =  rowData.isAssigned === false ? "Available" : "Assigned" 
    //     return (
    //         <>
    //             <span className="p-column-title">Asset Status</span>
    //             <span className={`banner-badge status-${rowData.isAssigned}`}>{statusData}</span>
    //         </>
    //     );
    // };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Link to={`/banner-info/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeletebanner(rowData)} />
                <Link to={`/update-banner/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-help  mt-2 mr-2" />
                </Link> 
            </div>
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

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">All Banners</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteBannerDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteBannerDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletebanner} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" style={{ margin: "1%" }}>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    {/* {bannerss?.map((bannerList) => {
                        if (bannerList.status === 1) {
                            bannerData.push(bannerList);
                        }
                    })} */}

                    {!bannerss ? (
                         <ProgressSpinner style={{display:'flex', justifyContent:'center'}} />
                    ) : (
                        <DataTable
                        ref={dt}
                        value={bannerss}
                        selection={selectedBanner}
                        onSelectionChange={(e) => setSelectedBanner(e.value)}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} banners"
                        globalFilter={globalFilter}
                        emptyMessage="No Banners found."
                        header={header}
                        responsiveLayout="scroll"
                        >
                            <Column style={{ display: "none" }} field="id" header="ID" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                            <Column field="imageName" header="Image Name" sortable headerStyle={{ width: "16%", minWidth: "10rem" }}></Column>
                            <Column field="image" header="Image" body={imageBodyTemplate} headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                            <Column body={actionBodyTemplate}></Column>
                        </DataTable>
                    )}
                   

                    <Dialog visible={deleteBannerDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteBannerDialogFooter} onHide={hideDeleteBannerDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {banner && (
                                <span>
                                    Are you sure you want to delete <b>{banner.imageName}</b>?
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

export default React.memo(Banners, comparisonFn);
