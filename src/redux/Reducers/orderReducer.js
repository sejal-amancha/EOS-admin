import * as types from '../ActionTypes/orderActionTypes';

const initialState = {
    orders: []
}

const orderReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_ORDERS_START:
        case types.DELETE_ORDER_START:
            return {
                ...state,
            };
        case types.LOAD_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
            }
        case types.DELETE_ORDER_SUCCESS:
            return {
                ...state,
            }
        case types.LOAD_ORDERS_ERROR:
        case types.DELETE_ORDER_ERROR:
            return {
                ...state,
                error: action.payload,
            };
         default:
            return state;
    }
}

export default orderReducer;