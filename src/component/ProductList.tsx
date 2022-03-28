import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {CoreProduct} from "../interface";
import {fetchCoreProductList} from "../api.service";

type Props = {
    selectedProductId: string,
    setSelectedProductId: Dispatch<SetStateAction<string>>
};

export default function ProductList({selectedProductId, setSelectedProductId}: Props) {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [productList, setProductList] = useState<CoreProduct[]>([]);

    // on component load
    useEffect(() => {
        getCoreProducts();
    }, []);

    async function getCoreProducts(): Promise<void> {
        setLoading(true);
        let response = await fetchCoreProductList();
        setLoading(false);

        if(response.success && "data" in response) {
            setProductList(response.data);
        }
    }

    function searchList(event: ChangeEvent<HTMLInputElement>): void {
        setSearchTerm(event.target.value);
    }

    // When search term is entered, only display items whose content contains the search term
    function shouldShow(content: string): boolean {
        return searchTerm.trim() === "" || content.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    }
    
    return (
        <>
            <ul className="list-group">
                <li className="list-group-item">
                    <input type="search" className="form-control my-1" placeholder="Search core products" onChange={searchList} />
                </li>
                
                {productList.map(product => (
                    shouldShow(product.core_id+product.internal_title) ?
                        <li className={"list-group-item list-group-item-action text-start" + (selectedProductId === product.core_id ? " active" : "")}
                            role="button" key={product.core_id} onClick={() => setSelectedProductId(product.core_id)}>
                            <div className="product-list-core-id">{product.core_id}</div>
                            <div className="product-list-internal-title">{product.internal_title}</div>
                        </li>
                        : null
                ))}
                
            </ul>
            {loading && <div className="spinner-border my-3" role="status"/>}
        </>
    );
}
