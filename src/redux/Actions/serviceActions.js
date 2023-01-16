import * as types from '../ActionTypes/serviceActionTypes';

export const loadServicesStart = () => ({
    type: types.LOAD_SERVICES_START,
});

export const loadServicesSuccess = (services) => ({
    type: types.LOAD_SERVICES_SUCCESS,
    payload: services,
});
  
export const loadServicesError = (error) => ({
    type: types.LOAD_SERVICES_ERROR,
    payload: error,
});

export const getSingleServiceStart = (singleService) => ({
    type: types.GET_SINGLE_SERVICE_START,
    payload: singleService,
});

export const getSingleServiceSuccess = (singleService) => ({
    type: types.GET_SINGLE_SERVICE_SUCCESS,
    payload: singleService,
});

export const getSingleServiceError = (error) => ({
    type: types.GET_SINGLE_SERVICE_ERROR,
    payload: error,
});

export const addnewServiceStart = (newService) => ({
    type: types.ADD_NEW_SERVICE_START,
    payload: newService,
});

export const addnewServiceSuccess = () => ({
    type: types.ADD_NEW_SERVICE_SUCCESS,
});

export const addnewServiceError = (error) => ({
    type: types.ADD_NEW_SERVICE_ERROR,
    payload: error,
});

export const updateServiceStart = (updateService) => ({
    type: types.UPDATE_SERVICE_START,
    payload: updateService,
});

export const updateServiceSuccess = () => ({
    type: types.UPDATE_SERVICE_SUCCESS,
});

export const updateServiceError = (error) => ({
    type: types.UPDATE_SERVICE_ERROR,
    payload: error,
});

export const deleteServicesStart = (deleteService) => ({
    type: types.DELETE_SERVICE_START,
    payload: deleteService,
});

export const deleteServicesSuccess = (deleteService) => ({
    type: types.DELETE_SERVICE_SUCCESS,
    payload: deleteService,
});

export const deleteServicesError = (error) => ({
    type: types.DELETE_SERVICE_ERROR,
    payload: error,
});