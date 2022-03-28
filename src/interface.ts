export interface BaseResponse {
    success: boolean,
    message?: string,
}

export interface CoreProductResponse extends BaseResponse {
    data: CoreProduct[]
}

// Products list object for API response
export interface CoreProduct {
    core_id: string,
    internal_title: string
}

// Product stock at a location
export interface Stock {
    location: string,
    quantity: number,
    transactions: Transaction[]
}

// Stock movement transaction for a specific location
export interface Transaction {
    id: number,
    core_id: string,
    location: string,
    quantity_change: number,
    date_time: Date
}

// Full product object for API response
export interface FullProduct {
    core_id: string,
    internal_title?: string,
    vendor?: string,
    vendor_title?: string,
    vendor_sku?: string,
    backup_vendor?: string,
    backup_vendor_sku?: string,
    restockable?: boolean,
    vendor_order_unit?: string,
    vendor_case_pack?: number,
    moq?: number,
    buffer_days?: number,
    minimum_level?: string,
    product_url?: string,
    note_for_next_order?: string,
    case_pack?: number,
    pieces_per_internal_box?: number,
    boxes_per_case?: number,
    tags_info?: string,
    tag1?: string,
    tag2?: string,
    tag3?: string,
    tag4?: string,
    hazmat?: string,
    active?: boolean,
    ignore_until?: string,
    notes?: string,
    total_quantity: number,
    stock: Stock[]
}
