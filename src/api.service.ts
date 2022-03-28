import {CoreProductResponse, BaseResponse, ProductDetailResponse} from "./interface";

const API_URL = process.env.REACT_APP_API_URL;
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

export async function fetchCoreProductList(): Promise<BaseResponse | CoreProductResponse> {
    return await _fetch<CoreProductResponse>(`${API_URL}/product`);
}

export async function fetchProductDetails(productId: string): Promise<BaseResponse | ProductDetailResponse> {
    return await _fetch<ProductDetailResponse>(`${API_URL}/product/${productId}`);
}

export async function updateQuantity(productId: string, location: string, quantityChange: number): Promise<BaseResponse> {
    return await _fetch(`${API_URL}/product/${productId}`, {
        headers,
        method: "PUT",
        body: JSON.stringify({location, quantityChange})
    });
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
