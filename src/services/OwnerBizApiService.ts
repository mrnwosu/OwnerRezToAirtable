import { ResponseModel, ContactType } from './../models/owner-rez-models-v2/CommonModels';
import { BookingDto } from './../models/airtable-dto-v1/bookings-dto';
import { BookingsModelV2, BookingStatus, BookingType } from './../models/owner-rez-models-v2/BookingsModels';
import axios, { AxiosRequestConfig } from "axios";


export class OwnerBizApiService{
    username: string = ""
    password: string = ""

    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }

    //Find way to authenticate with username/password
    getOptionsV2(endPoint: string, data: any = null, params: any = null,  method: string = "GET"):AxiosRequestConfig{
        return {
            method: method,
            url: `https://api.ownerreservations.com/v2/${endPoint}`,
            headers: {
              'Content-Type': 'application/json'
            },
            auth: {
                username: this.username,
                password: this.password
            },
            data: data,
            params: params,
            
        };
    }

    //Bookings 
    async getBookingById<TModel>(bookingId: number): Promise<TModel>{{
        return await this.getById<TModel>('bookings', bookingId)
    }}

    async getBookings<TModel>(from: Date){
        return await this.searchItems<TModel>("bookings", {
            include_guests: 'true',
            include_charges: 'true',
            since_utc: '2022-08-12T01:12:51.081Z',
            limit: '100',
            offset: '200'
        })
    }

    //Addresses

    //Guests
    async getGuestById<TModel>(guestId: number): Promise<TModel>{
        return await this.getById('guests', guestId)
    }

    //Properties
    private async getById<TModel>(entityType: string, id:number): Promise<TModel> {
        var options = this.getOptionsV2(`${entityType}/${id}`)
        return (await axios(options)).data
    }

    private async searchItems<TModel>(entityType: string, params: any): Promise<ResponseModel<TModel>>{
        var options = this.getOptionsV2(entityType, null, params)
        return (await axios(options)).data
    }
}

//Refactor this
export class ModelConverter{
    static bookingToDio(booking: BookingsModelV2): BookingDto{
        let dto = new BookingDto()
        dto.adults = booking.adults
        dto.arrival = booking.arrival
        dto.id = booking.id
        dto.booked_utc = booking.booked_utc
        dto.check_in = booking.check_in
        dto.check_out = booking.check_out
        dto.children = booking.children
        dto.currency_code = booking.currency_code
        dto.departure = booking.departure
        dto.guest_id = booking.guest_id
        dto.infants = booking.infants
        dto.is_block = Number(booking.is_block)
        dto.listing_site = booking.listing_site
        dto.pets = booking.pets
        dto.property_id = booking.property_id
        dto.status = parseInt(BookingStatus[booking.status])
        dto.total_amount = booking.total_amount
        dto.total_paid = booking.total_paid
        dto.total_owed = booking.total_owed
        dto.type = parseInt(BookingType[booking.type])
        return dto
    }
}