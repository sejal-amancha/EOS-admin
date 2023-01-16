import * as types from '../ActionTypes/categoryActionTypes';

export const loadCategoriesStart = (categories) => ({
    type: types.LOAD_CATEGORIES_START,
    payload: categories,
});

export const loadCategoriesSuccess = (categories) => ({
    type: types.LOAD_CATEGORIES_SUCCESS,
    payload: categories,
});
  
export const loadCategoriesError = (error) => ({
    type: types.LOAD_CATEGORIES_ERROR,
    payload: error,
});

export const addnewCategoryStart = (newCategory) => ({
    type: types.ADD_NEW_CATEGORY_START,
    payload: newCategory,
});

export const addnewCategorySuccess = () => ({
    type: types.ADD_NEW_CATEGORY_SUCCESS,
});

export const addnewCategoryError = (error) => ({
    type: types.ADD_NEW_CATEGORY_ERROR,
    payload: error,
});

export const updateCategoryStart = (updateCategory) => ({
    type: types.UPDATE_CATEGORY_START,
    payload: updateCategory,
});

export const updateCategorySuccess = () => ({
    type: types.UPDATE_CATEGORY_SUCCESS,
});

export const updateCategoryError = (error) => ({
    type: types.UPDATE_CATEGORY_ERROR,
    payload: error,
});

export const getSingleCategoryStart = (singleCategory) => ({
    type: types.GET_SINGLE_CATEGORY_START,
    payload: singleCategory,
});

export const getSingleCategorySuccess = (singleCategory) => ({
    type: types.GET_SINGLE_CATEGORY_SUCCESS,
    payload: singleCategory,
});

export const getSingleCategoryError = (error) => ({
    type: types.GET_SINGLE_CATEGORY_ERROR,
    payload: error,
})

export const deleteCategoryStart = (deleteCategory) => ({
    type: types.DELETE_CATEGORY_START,
    payload: deleteCategory,
});

export const deleteCategorySuccess = (deleteCategory) => ({
    type: types.DELETE_CATEGORY_SUCCESS,
    payload: deleteCategory,
});

export const deleteCategoryError = (error) => ({
    type: types.DELETE_CATEGORY_ERROR,
    payload: error,
});

