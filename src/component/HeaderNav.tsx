import React from "react";

export default function HeaderNav() {
    // Not functional, purely aesthetics.
    return (
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
    );
}
