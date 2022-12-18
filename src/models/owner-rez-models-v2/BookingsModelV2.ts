import { FieldValueModel } from "./CommonModels";
import { GuestPartialModel } from "./GuestModels";
import { BookingChargeModel, BookingDoorCodeModel, BookingStatus, BookingType } from "./BookingsModels";


export interface BookingModelV2 {
    adults: number;
    arrival: Date;
    booked_utc: Date;
    canceled_utc: Date;
    charges: BookingChargeModel[];
    check_in: string;
    check_out: string;
    children: number;
    cleaning_date: Date;
    currency_code: string;
    departure: Date;
    door_codes: BookingDoorCodeModel[];
    fields: FieldValueModel[];
    guest: GuestPartialModel;
    guest_id: number;
    id: number;
    infants: number;
    is_block: boolean;
    listing_site: string;
    notes: string;
    pending_until_utc: Date;
    pets: number;
    platform_email_address: string;
    property_id: number;
    quote_id: number;
    status: BookingStatus;
    tags: string[];
    title: string;
    total_amount: number;
    total_host_fees: number;
    total_owed: number;
    total_paid: number;
    total_refunded: number;
    type: BookingType;
}
