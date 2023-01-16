import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("ADMIN_TOKEN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};

export const loadEstimationApi = async () =>  await axios.get("http://localhost:9000/api/projectEstimation", { headers : headersParam});

