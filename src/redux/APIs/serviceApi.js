import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("ADMIN_TOKEN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};

export const loadServiceApi = async () =>  await axios.get("http://localhost:9000/api/service/getallservice", { headers : headersParam});

export const getSingleServiceApi = async (singleService) =>  await axios.get(`http://localhost:9000/api/service/${singleService}`, { headers: headersParam })

export const deleteServiceApi = async (deleteService) => await axios.delete(`http://localhost:9000/api/service/${deleteService.id}`, { headers: headersParam })

export const addNewServiceApi = async (newService) => await axios.post("http://localhost:9000/api/service/Create", newService, { headers : headersParam})

export const updateServiceApi = async (updateService) => await axios.put(`http://localhost:9000/api/service/${updateService.get('id')}`, updateService, { headers: headersParam })
