
export enum LineItemType{
    Rent = 1,
    Surcharge = 2,
    Tax = 3,
    TaxOther = 4,
    SurchargeOther = 5,
}

export interface BookingChargeModel{
    amount: number
    commission_amount: number
    description: string
    expense_id: number
    is_channel_managed: boolean
    is_commission_all: boolean
    is_expense_all: boolean
    is_taxable: boolean
    owner_amount: number
    owner_commission_percent: number
    position: number
    rate: number
    rate_is_percent: boolean
    surcharge_id: number
    tax_id: number
    type: LineItemType
}

export interface BookingDoorCodeModel{
    code: string
    lock_name: string
}

export enum BookingStatus{
    active = 1,
    canceled = 2, 
    pending = 3
}

export enum BookingType{
    booking = 1, 
    block = 2,
    quoteHold = 3,
    linkedAvailability = 4
}

export interface BookingsSearchFilter{
    from: Date
    include_charges: boolean
    include_door_codes: boolean
    include_fields: boolean
    include_guest: boolean
    include_tags: boolean
    property_ids: number[]
    since_utc: Date
    to: Date
}