import * as types from '../ActionTypes/actionTypes';

const initialState = {
    loginData: [],
    users: [],
    singleUser: [],
    changePass: [],
    forgotPass: [],
    // singleUserAssignment: [],
    // loading: false,
}

const usersReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.ADMIN_LOGIN_START:
        case types.LOAD_USERS_START:
        case types.USER_CHANGE_PASSWORD_START:
        case types.FORGOT_PASSWORD_START:
        // case types.ADMIN_LOGOUT_START:
        // case types.ADD_NEW_EMPLOYEE_START:
        // case types.UPDATE_EMPLOYEE_START:
        case types.DELETE_USER_START:
        case types.GET_SINGLE_USER_START:
            return {
                ...state,
            };
        case types.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                loginData: action.payload,
            };
        case types.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPass: action.payload
            };
        case types.LOAD_USERS_SUCCESS:
            return {
                 ...state,
                users: action.payload,
            };
        case types.GET_SINGLE_USER_SUCCESS:
            return {
                ...state,
                singleUser: action.payload,
            }
        case types.USER_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                changePass: action.payload,
            }
        // case types.ADMIN_LOGOUT_SUCCESS:
        // case types.ADD_NEW_USER_SUCCESS:
        // case types.UPDATE_USER_SUCCESS:
        case types.DELETE_USER_SUCCESS:
            return {
                ...state,   
            };
        case types.ADMIN_LOGIN_ERROR:
        case types.USER_CHANGE_PASSWORD_ERROR:
        // case types.ADMIN_LOGOUT_ERROR:
        case types.LOAD_USERS_ERROR:
        // case types.ADD_NEW_USER_ERROR:
        // case types.UPDATE_USER_ERROR:
        case types.DELETE_USER_ERROR:
        case types.GET_SINGLE_USER_ERROR:
        case types.FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default usersReducer;