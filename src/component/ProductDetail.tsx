import {FullProduct, Stock} from "../interface";
import React, {useEffect, useState} from "react";
import {fetchProductDetails} from "../api.service";
import {snakeCaseToTitleCase} from "../util";
import LocationRow from "./LocationRow";

type Props = {
    selectedProductId: string,
    clearSelected: () => void
};

export default function ProductDetail({ selectedProductId, clearSelected } : Props) {
    const [loading, setLoading] = useState(false);
    const [fullProduct, setFullProduct] = useState<FullProduct | null>();
    
    useEffect(() => {
        getProductDetails();
    } ,[selectedProductId]); // Re-fetch each time selectedProductId changes
    
    async function getProductDetails(): Promise<void> {
        setFullProduct(null);
        setLoading(true);
        let response = await fetchProductDetails(selectedProductId);
        setLoading(false);
        
        if(response.success && "data" in response) {
            setFullProduct(response.data);
        }
    }

    // Update state with changed quantity values from LocationRow
    function updateLocationStock(updatedStock: Stock, index: number, qtyChanged: number) {
        if(fullProduct != null) {
            let tmp = [...fullProduct.stock];
            tmp[index] = updatedStock;
            setFullProduct({...fullProduct, stock: tmp, total_quantity: fullProduct.total_quantity + qtyChanged} as FullProduct);
        }
    }
    
    return (
        <>
            {fullProduct != null &&
                <div className="text-start">
                    <div className="row mb-5">
                        <div className="col-2"><button className="btn-close mt-4" onClick={clearSelected} /></div>
                        <div className="col-8 text-center"><h3 className="mt-3">Core product details</h3></div>
                    </div>
                    
                    {/*Core product details*/}
                    {Object.entries(fullProduct).map(([key, value]) => {
                        // Loop through each property and render those that aren't null or objects
                        if(value && typeof value != "object") {
                            return (
                                <div className="m-3" key={key}>
                                    <span className="fw-bold">{snakeCaseToTitleCase(key)}: </span>
                                    <span>{value}</span>
                                </div>
                            );
                        }
                        return null;
                    })}
                    
                    {/*Stocks*/}
                    {fullProduct.stock.length > 0 && <>
                        <h4 className="pt-4">Stocks</h4>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Location</th>
                                <th>Quantity</th>
                                <th>Quantity change</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                            {fullProduct.stock.map((value, index) => (
                                <LocationRow locationStock={value} updateLocationStock={updateLocationStock} selectedProductId={selectedProductId} key={index} index={index} />
                            ))}
                            </tbody>
                        </table>
                    </>}
                </div>}
            {loading && <div className="spinner-border my-5 product-detail-spinner" role="status"/>}
        </>
    );
}
