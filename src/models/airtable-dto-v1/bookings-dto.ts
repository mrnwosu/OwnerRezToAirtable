export class BookingDto{
    id: number = 0;
    adults: number = 0;
    arrival: Date = new Date(0);
    booked_utc: Date = new Date(0);
    check_in: string = "";
    check_out: string = "";
    children: number= 0;
    currency_code: string = "";
    departure: Date = new Date(0);
    guest_id: number= 0;
    infants: number= 0 ;
    is_block: number = 0; 
    listing_site: string = "";
    pets: number= 0;
    property_id: number= 0;
    status: number= 0;
    total_amount: number= 0;
    total_paid: number= 0;
    total_owed: number= 0;
    type: number = 0;
    guest_first_name: string = ""
    guest_last_name: string = ""
    guest_address: string = "";
    guest_email: string = "";
    guest_phones: string = "";
    door_code: string = "";
}
