import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("ADMIN_TOKEN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};

export const loadCategoryApi = async (category) => await axios.get(`http://localhost:9000/api/categories/${category}`, { headers: headersParam });

export const addNewCategoryApi = async (newCategory) => await axios.post(`http://localhost:9000/api/categories/Create`, newCategory, { headers: headersParam });

export const updateCategoryApi = async (updateCategory) => await axios.put(`http://localhost:9000/api/categories/${updateCategory.get('id')}`, updateCategory, { headers: headersParam });

export const deleteCategoryApi = async (deleteCategory) => await axios.delete(`http://localhost:9000/api/categories/${deleteCategory.id}`, { headers: headersParam });

export const getSingleCategoryApi = async (singleCategory) => await axios.get(`http://localhost:9000/api/categories/single-categories/${singleCategory}`, { headers: headersParam });


