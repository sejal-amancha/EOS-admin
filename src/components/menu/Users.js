import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadUsersStart, deleteUserStart } from "../../redux/Actions/actions";
import { Link } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

const Users = () => {
    let userData = [];
    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const users = useSelector((state) => state?.users?.users?.postData);
    // const usersStatus = useSelector((state => state?.users?.users?.status))
    // console.log("USERS~~~~~>>>", usersStatus)
    // const [loaderState, setloaderState] = useState(false);
    const [user, setUser] = useState();
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        // setloaderState(true);
        dispatch(loadUsersStart())

        // if(usersStatus == 200) {
        //     setloaderState(false);
        // }
    }, []);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const confirmDeleteEmployee = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    const deleteEmployee = async () => {
        setUser(user);
        dispatch(deleteUserStart(user.id));
        setDeleteUserDialog(false);
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

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Link to={`/user-info/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteEmployee(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">All Users</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteEmployee} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" style={{ margin: "1%" }}>
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
                   
                    {!users ? (
                        <ProgressSpinner style={{display:'flex', justifyContent:'center'}} /> ) : (
                        <DataTable
                            ref={dt}
                            value={users}
                            dataKey="id"
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 25]}
                            className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                            globalFilter={globalFilter}
                            emptyMessage="No Users found."
                            header={header}
                            responsiveLayout="scroll"
                        >
                            <Column style={{ display: "none" }} field="id" header="ID" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                            <Column field="name" header="Name" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                            <Column field="email" header="Email Address" headerStyle={{ width: "18%", minWidth: "14rem" }}></Column>
                            <Column body={actionBodyTemplate}></Column>
                        </DataTable>
                    )}

                    {/* {users?.map((userList) => {
                        if (userList.status == 1) {
                            userData.push(userList);
                        }
                        console.log("USERAATA~~~~>>>>", userData)
                    })} */}

                    <Dialog visible={deleteUserDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {user && (
                                <span>
                                    Are you sure you want to delete <b>{user.name}</b>?
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

export default React.memo(Users, comparisonFn);
