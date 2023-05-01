import axios from "axios";
import { devEnv } from "../configs/environment.config";
import { GET_ALL_PRODUCTS, GET_ONE_PRODUCT, } from "./CONSTANTS";
export const getAllProducts = async (currentPage = 1) => {
    const config = {
        url: `${devEnv.API_BASE_URL_DEV}${GET_ALL_PRODUCTS}?page=${currentPage}`,
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    };
    return await axios(config);
};
export const getSingleProduct = async (id) => {
    const config = {
        url: `${devEnv.API_BASE_URL_DEV}${GET_ONE_PRODUCT}/${id}`,
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    };
    return await axios(config);
};
