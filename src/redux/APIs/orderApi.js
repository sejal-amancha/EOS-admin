import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("ADMIN_TOKEN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`,
};

export const loadOrdersApi = async () => await axios.get(`http://localhost:9000/api/order/getall`, { headers: headersParam });

export const getSingleOrderApi = async (singleOrder) => await axios.get(`http://localhost:9000/api/order/${singleOrder}`, { headers: headersParam });

export const deleteOrderApi = async (deleteOrder) => await axios.delete(`http://localhost:9000/api/order/${deleteOrder.id}`, { headers: headersParam });

 