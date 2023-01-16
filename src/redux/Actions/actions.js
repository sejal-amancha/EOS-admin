import * as types from '../ActionTypes/actionTypes';

export const adminLoginStart = (user) => ({
    type: types.ADMIN_LOGIN_START,
    payload: user,
});

export const adminLoginSuccess = (login) => ({
    type: types.ADMIN_LOGIN_SUCCESS,
    payload: login,
});

export const adminLoginError = (error) => ({
    type: types.ADMIN_LOGIN_ERROR,
    payload: error,
});

export const adminForgotPassStart = (admin) => ({
    type: types.FORGOT_PASSWORD_START,
    payload: admin,
});

export const adminForgotPassSuccess = (admin) => ({
    type: types.FORGOT_PASSWORD_SUCCESS,
    payload: admin,
});

export const adminForgotPassError = (error) => ({
    type: types.FORGOT_PASSWORD_ERROR,
    payload: error,
});

export const userChangePasswordStart = (userChangePass) => ({
    type: types.USER_CHANGE_PASSWORD_START,
    payload: userChangePass,
});

export const userChangePasswordSuccess = (changePass) => ({
    type: types.USER_CHANGE_PASSWORD_SUCCESS,
    payload: changePass,
});

export const userChangePasswordError = (error) => ({
    type: types.USER_CHANGE_PASSWORD_ERROR,
    payload: error
});

// export const adminLogoutStart = () => ({
//     type: types.ADMIN_LOGOUT_START
// });

// export const adminLogoutSuccess = () => ({
//     type: types.ADMIN_LOGOUT_SUCCESS,
// });

// export const adminLogoutError = () => ({
//     type: types.ADMIN_LOGOUT_ERROR,
// });

export const loadUsersStart = () => ({
    type: types.LOAD_USERS_START,
});

export const loadUsersSuccess = (users) => ({
    type: types.LOAD_USERS_SUCCESS,
    payload: users,
});
  
export const loadUsersError = (error) => ({
    type: types.LOAD_USERS_ERROR,
    payload: error,
});

// export const addNewEmployeeStart = (newEmployee) => ({
//     type: types.ADD_NEW_EMPLOYEE_START,
//     payload: newEmployee,
// });

// export const addNewEmployeeSuccess = () => ({
//     type: types.ADD_NEW_EMPLOYEE_SUCCESS, 
// });

// export const addNewEmployeeError = (error) => ({
//     type: types.ADD_NEW_EMPLOYEE_ERROR,
//     payload: error,
// });

// export const updateEmployeeStart = (updateEmployee) => ({
//     type: types.UPDATE_EMPLOYEE_START,
//     payload: updateEmployee,
// });

// export const updateEmployeeSuccess = () => ({
//     type: types.UPDATE_EMPLOYEE_SUCCESS,
// });

// export const updateEmployeeError = (error) => ({
//     type: types.UPDATE_EMPLOYEE_ERROR,
//     payload: error,
// });

export const getSingleUserStart = (singleUser) => ({
    type: types.GET_SINGLE_USER_START,
    payload: singleUser,
});

export const getSingleUserSuccess = (singleUser) => ({
    type: types.GET_SINGLE_USER_SUCCESS,
    payload: singleUser,  
});

export const getSingleUserError = (error) => ({
    type: types.GET_SINGLE_USER_ERROR,
    payload: error,
})

// export const getSingleEmployeeAssignemntStart = (singleEmployeeItem) => ({
//     type: types.GET_SINGLE_EMPLOYEE_ASSIGNMENT_START,
//     payload: singleEmployeeItem,
// });

// export const getSingleEmployeeAssignemntSuccess = (singleEmployeeItem) => ({
//     type: types.GET_SINGLE_EMPLOYEE_ASSIGNMENT_SUCCESS,
//     payload: singleEmployeeItem,
// });

// export const getSingleEmployeeAssignemntError = (error) => ({
//     type: types.GET_SINGLE_EMPLOYEE_ASSIGNMENT_ERROR,
//     payload: error,
// });

export const deleteUserStart = (userId) => ({
    type: types.DELETE_USER_START,
    payload: userId,
});

export const deleteUserSuccess = (userId) => ({
    type: types.DELETE_USER_SUCCESS,
    payload: userId,
});

export const deleteUserError = (error) => ({
    type: types.DELETE_USER_ERROR,
    payload: error,
});

