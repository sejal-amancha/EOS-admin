import * as types from "../ActionTypes/actionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import {
    loadUsersSuccess,
    loadUsersError,
    adminLoginSuccess,
    adminLoginError,
    getSingleUserSuccess,
    getSingleUserError,
    deleteUserSuccess,
    deleteUserError,
    userChangePasswordSuccess,
    userChangePasswordError,
    adminForgotPassSuccess,
    adminForgotPassError,
} from "../Actions/actions";

import { 
    loadUsersApi, 
    adminLoginApi, 
    deleteUserApi,
    getSingleUserApi,
    userChangePassApi,
    adminForgotPassApi,
} from "../APIs/api";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});

export function* onLoadUsersStartAsync() {
    try {
        const response = yield call(loadUsersApi);
        if (response.data.status === 200) {
            yield put(loadUsersSuccess(response.data));
        }
    } catch (error) {
        yield put(loadUsersError(error.response));
    }
}

export function* onAdminLoginStartAsync({ payload }) {
        try {
        const response = yield call(adminLoginApi, payload) 
        console.log("RESPOSNE~~~", response)
        if (response.data.status === 200) {
            sessionStorage.setItem("ADMIN_TOKEN", JSON.stringify(response.data.data.token));
            yield put(adminLoginSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
        yield put(adminLoginError(error.response));
        Toast.fire({
            icon: "error",
            title: "Invalid Email or Password",
        });
    }
}

export function* onUserChangePassAsync({ payload }) {

    try {
        const response = yield call(userChangePassApi, payload);
        if (response.data.status === 200) {
            yield put(userChangePasswordSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(userChangePasswordError(error.response));
        Toast.fire({
            icon: "error",
            title: "Something went wrong, Please try again..!!",
        });
    }
}

// export function* onAdminLogoutStartAsync() {
//     try {
//         sessionStorage.removeItem("ADMIN");
//         const response = yield call(adminLogoutStart);
//         if (response.data.success === true) {
//             yield put(adminLogoutSuccess(response.data));
//         }
//     } catch (error) {
//         yield put(adminLogoutError(error.response));
//     }
// }

// export function* onAddNewEmployeeStartAsync({ payload }) {
//     try {
//         const response = yield call(addEmployeeApi, payload);
//         if (response.data.success === true) {
//             yield put(addNewEmployeeSuccess(response.data));
//             Toast.fire({
//                 icon: "success",
//                 title: response.data.message,
//             });
//         } else {
//             if (response.data.errors.firstName) {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.firstName,
//                 });
//             } else if (response.data.errors.last_name) {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.last_name,
//                 });
//             } else if (response.data.errors.lastName) {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.lastName,
//                 });
//             } else if (response.data.errors.phone) {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.phone,
//                 });
//             } else if (response.data.errors.password) {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.password,
//                 });
//             } else if (response.data.errors.confirmPassword) {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.confirmPassword,
//                 });
//             } else {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.email,
//                 });
//             }
//         }
//     } catch (error) {
//         yield put(addNewEmployeeError(error.response));
//     }
// }

// export function* onUpdateEmployeeStartAsync({ payload }) {
//     try {
//         const response = yield call(updateEmployeeApi, payload);
//         if (response.data.success === true) {
//             yield put(updateEmployeeSuccess(response.data));
//             Toast.fire({
//                 icon: "success",
//                 title: response.data.message,
//             });
//         } else {
//             if (response.data.errors.firstName) {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.firstName,
//                 });
//             } else if (response.data.errors.last_name) {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.last_name,
//                 });
//             } else if (response.data.errors.lastName) {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.lastName,
//                 });
//             } else if (response.data.errors.phone) {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.phone,
//                 });
//             } else if (response.data.errors.password) {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.password,
//                 });
//             } else if (response.data.errors.confirmPassword) {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.confirmPassword,
//                 });
//             } else {
//                 Toast.fire({
//                     icon: "error",
//                     title: response.data.errors.email,
//                 });
//             }
//         }
//     } catch (error) {
//         yield put(updateEmployeeError(error.response));
//     }
// }

export function* onDeleteUserStartAsync( userId ) {
    try {
        const response = yield call(deleteUserApi, userId.payload)       
        if (response.data.status === 200) {
           
            yield put(deleteUserSuccess(userId.payload));
            Toast.fire({
                icon: "success",
                title: "User deleted Successfully!!",
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(deleteUserError(error.response));
    }
}

export function* onSigleUserStartAsync({ payload }) {
    try {
        const response = yield call(getSingleUserApi, payload)        
        if (response.data.message === 'Success') {
            yield put(getSingleUserSuccess(response.data));
        }
    } catch (error) {
        yield put(getSingleUserError(error.response));
    }
}

export function* onAdminForgotPassStartAsync({ payload }) {
    try {
        const response = yield call(adminForgotPassApi, payload);
        if (response.data.status === 200) {
            yield put(adminForgotPassSuccess(response.data));
        }
    } catch (error) {
        yield put(adminForgotPassError(error.response));
    }
}

export function* onAdminLogin() {
    yield takeLatest(types.ADMIN_LOGIN_START, onAdminLoginStartAsync);
}

export function* onUserChangePass() {
    yield takeLatest(types.USER_CHANGE_PASSWORD_START, onUserChangePassAsync);
}

// export function* onAdminLogout() {
//     yield takeLatest(types.ADMIN_LOGOUT_START, onAdminLogoutStartAsync);
// }

export function* onLoadUsers() {
    yield takeLatest(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

// export function* onAddNewEmployee() {
//     yield takeLatest(types.ADD_NEW_EMPLOYEE_START, onAddNewEmployeeStartAsync);
// }

// export function* onUpdateEmployee() {
//     yield takeLatest(types.UPDATE_EMPLOYEE_START, onUpdateEmployeeStartAsync);
// }

export function* onGetSingleUser() {
    yield takeLatest(types.GET_SINGLE_USER_START, onSigleUserStartAsync);
}

export function* onAdminForgotPassword() {
    yield takeLatest(types.FORGOT_PASSWORD_START, onAdminForgotPassStartAsync);
}

export function* onDeleteEmployee() {
    yield takeLatest(types.DELETE_USER_START, onDeleteUserStartAsync);
}

const userSagas = [
    fork(onAdminLogin),
    fork(onLoadUsers),
    fork(onAdminForgotPassword),
    fork(onGetSingleUser),
    fork(onDeleteEmployee),
    fork(onUserChangePass),
];

export default function* userSaga() {
    yield all([...userSagas]);
}
