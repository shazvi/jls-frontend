import React, {useState} from 'react';
import './App.css';
import ProductDetail from "./component/ProductDetail";
import HeaderNav from "./component/HeaderNav";
import ProductList from "./component/ProductList";


function App() {
    const [selectedProductId, setSelectedProductId] = useState("");
    
    function clearSelected() {
        setSelectedProductId("");
    }

    return (
        <div className="container-fluid">
            <HeaderNav />
            
            <div className="container bg-white mt-4 shadow-sm">
                <div className="row text-center">
                    <div className="col-3 ps-0">
                        <ProductList {...{ selectedProductId, setSelectedProductId }} />
                    </div>
                    
                    <div className="col-9 mb-5">
                        {selectedProductId !== "" ?
                            <ProductDetail {...{ selectedProductId, clearSelected }} />
                            :
                            <p className="select-product-text mt-5">Select a product to see its details</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
