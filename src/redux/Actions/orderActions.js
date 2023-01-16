import * as types from '../ActionTypes/orderActionTypes';

export const loadOrdersStart = () => ({
    type: types.LOAD_ORDERS_START,
});

export const loadOrdersSuccess = (orders) => ({
    type: types.LOAD_ORDERS_SUCCESS,
    payload: orders,
});
  
export const loadOrdersError = (error) => ({
    type: types.LOAD_ORDERS_ERROR,
    payload: error,
});

export const getSingleOrderStart = (singleOrder) => ({
    type: types.GET_SINGLE_ORDER_START,
    payload: singleOrder,
});

export const getSingleOrderSuccess = (singleOrder) => ({
    type: types.GET_SINGLE_ORDER_SUCCESS,
    payload: singleOrder,
});

export const getSingleOrderError = (error) => ({
    type: types.GET_SINGLE_ORDER_ERROR,
    payload: error,
});

export const deleteOrderStart = (deleteOrder) => ({
    type: types.DELETE_ORDER_START,
    payload: deleteOrder,
});

export const deleteOrderSuccess = (deleteOrder) => ({
    type: types.DELETE_ORDER_SUCCESS,
    payload: deleteOrder,
});

export const deleteOrderError = (error) => ({
    type: types.DELETE_ORDER_ERROR,
    payload: error,
});