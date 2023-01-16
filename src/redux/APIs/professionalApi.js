import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("ADMIN_TOKEN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};

export const loadProfessionalsApi = async () =>  await axios.get("http://localhost:9000/api/professional/", { headers : headersParam});

export const getSingleProfessionalApi = async (singleProfessional) =>  await axios.get(`http://localhost:9000/api/professional/${singleProfessional}`, { headers: headersParam })

export const deleteProfessionalApi = async (deleteProfessional) => await axios.delete(`http://localhost:9000/api/professional/${deleteProfessional.id}`, { headers: headersParam })
