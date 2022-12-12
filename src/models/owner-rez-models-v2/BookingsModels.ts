import { FieldValueModel } from "./CommonModels"
import { GuestPartialModel } from "./GuestModels"

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

export interface BookingsModelV2{
    adults: number
    arrival: Date
    booked_utc: Date
    canceled_utc: Date
    charges: BookingChargeModel[]
    check_in: string
    check_out: string
    children: number
    cleaning_date: Date
    currency_code: string
    departure: Date
    door_codes: BookingDoorCodeModel[]
    fields: FieldValueModel[]
    guest: GuestPartialModel
    guest_id: number
    id: number
    infants: number
    is_block: boolean
    listing_site: string
    notes: string
    pending_until_utc: Date
    pets: number
    platform_email_address: string
    property_id: number
    quote_id: number
    status: BookingStatus
    tags: string[]
    title: string
    total_amount: number
    total_host_fees: number
    total_owed: number
    total_paid: number
    total_refunded: number
    type: BookingType
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