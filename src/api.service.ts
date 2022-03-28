import {CoreProductResponse, BaseResponse} from "./interface";

const API_URL = "http://localhost:3001";
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

export async function fetchCoreProductList(): Promise<BaseResponse | CoreProductResponse> {
    return await _fetch<CoreProductResponse>(`${API_URL}/product`);
}

// catch any errors from fetch call
async function _fetch<T>(url: string, options?: RequestInit): Promise<T | BaseResponse> {
    try {
        const response = options ? await fetch(url, options) : await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Sorry. Something went wrong",
        };
    }
}
