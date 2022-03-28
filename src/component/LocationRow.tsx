import React, {ChangeEvent, FormEvent, useState} from "react";
import {Stock} from "../interface";
import {updateQuantity} from "../api.service";

type Props = {
    locationStock: Stock,
    updateLocationStock: (updatedStock: Stock, index: number, qtyChanged: number) => void,
    selectedProductId: string,
    index: number,
};

export default function LocationRow({ locationStock, updateLocationStock, selectedProductId, index }: Props) {
    const [loading, setLoading] = useState(false);
    const [qtyFieldValue, setQtyFieldValue] = useState(0);

    function updateEditField(event: ChangeEvent<HTMLInputElement>): void {
        setQtyFieldValue(Number(event.target.value));
    }
    
    async function submitQty(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let tmp = {...locationStock, quantity: locationStock.quantity + qtyFieldValue} as Stock;
        if (tmp.quantity < 0) { // quantity below 0. abort submit
            return;
        }
        
        setLoading(true);
        const response = await updateQuantity(selectedProductId, locationStock.location, qtyFieldValue);
        setLoading(false);
        
        if (response.success) {
            updateLocationStock(tmp, index, qtyFieldValue);
        }
    }
    
    return (
        <tr key={locationStock.location}>
            <td>{locationStock.location}</td>
            <td>{locationStock.quantity}</td>
            <td><form id={"qtyForm" + locationStock.location} onSubmit={submitQty}>
                <input
                    disabled={loading}
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Quantity change"
                    min={locationStock.quantity * -1}
                    required={true}
                    onChange={updateEditField} />
            </form></td>
            
            <td><button disabled={loading} type="submit" form={"qtyForm" + locationStock.location} className="btn btn-sm btn-outline-primary">
                {loading ? <div className="spinner-border spinner-border-sm" role="status"/> : "Update"}
            </button></td>
        </tr>
    );
}
