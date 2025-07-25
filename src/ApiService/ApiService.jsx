import axios from "axios";
const BASE_URL= 'http://localhost:5000'


export const getAllProducts = async()=>{
    const response =await axios.get(`${BASE_URL}/products`)
    return response.data;
}

export const getProductId = async(id)=>{
    const response =await axios.get(`${BASE_URL}/products/${id}`)
    return response.data;
}

export const getProductImage = async(id)=>{
    const response =await axios.get(`${BASE_URL}/products/${id}/image`)
    return response.data;
}