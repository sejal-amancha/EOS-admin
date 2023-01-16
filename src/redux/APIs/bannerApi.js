import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("ADMIN_TOKEN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`,
};

export const loadBannerApi = async () => await axios.get(`http://localhost:9000/api/banner/getall`, { headers: headersParam });

export const getSingleBannerApi = async (singleBanner) =>  await axios.get(`http://localhost:9000/api/banner/${singleBanner}`, { headers: headersParam })

export const updateBannerApi = async (updateBanner) => await axios.put(`http://localhost:9000/api/banner/${updateBanner.get('id')}`, updateBanner, { headers: headersParam });

export const deleteBannerApi = async (deleteBanner) => await axios.delete(`http://localhost:9000/api/banner/${deleteBanner.id}`, { headers: headersParam })

export const addNewBannerApi = async (newBanner) => await axios.post("http://localhost:9000/api/banner/Create", newBanner, { headers : headersParam})