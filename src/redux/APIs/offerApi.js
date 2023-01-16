import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("ADMIN_TOKEN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};

export const loadOffersApi = async () =>  await axios.get("http://localhost:9000/api/bestOffers/getall", { headers : headersParam});

export const addNewOfferApi = async (newOffer) => await axios.post("http://localhost:9000/api/bestOffers/Create", newOffer, { headers : headersParam})

export const updateOfferApi = async (updateOffer) => await axios.put(`http://localhost:9000/api/bestOffers/${updateOffer.get('id')}`, updateOffer, { headers: headersParam })

export const getSingleOfferApi = async (singleOffer) => await axios.get(`http://localhost:9000/api/bestOffers/${singleOffer}`, { headers: headersParam })

export const deleteOfferApi = async (deleteOffer) => await axios.delete(`http://localhost:9000/api/bestOffers/${deleteOffer.id}`, { headers: headersParam })