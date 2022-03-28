import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {fetchCoreProductList} from "./api.service";
import {CoreProduct} from "./interface";


function App() {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProductId, setSelectedProductId] = useState("");
    const [productList, setProductList] = useState<CoreProduct[]>([]);
    
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
    
    function shouldShow(content: string): boolean {
        return searchTerm.toLowerCase().trim() === "" || content.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    }

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="container">
                    <span className="navbar-brand">JLS Inventory Management System</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <span className="nav-link" >Reports</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link active" aria-current="page">Inventory</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link">Quotes</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link">Orders</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            <div className="container bg-white mt-4 shadow-sm">
                <div className="row">
                    <div className="col-3 ps-0 text-center">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <input disabled={selectedProductId !== ""} type="search" className="form-control my-1" placeholder="Search core products" onChange={searchList} />
                            </li>
                            {productList.map(product => (
                                shouldShow(product.core_id+product.internal_title) ?
                                    <li key={product.core_id} className="list-group-item text-start">
                                        <div className="product-list-core-id">{product.core_id}</div>
                                        <div className="product-list-internal-title">{product.internal_title}</div>
                                    </li>
                                    : null
                            ))}
                        </ul>

                        {loading && <div className="spinner-border my-3" role="status"/>}
                    </div>
                    
                    <div className="col-9">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
