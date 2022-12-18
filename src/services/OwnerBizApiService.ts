import { ResponseModel, ContactType } from './../models/owner-rez-models-v2/CommonModels';
import axios, { AxiosRequestConfig } from "axios";


export class OwnerBizApiService{
    username: string = ""
    password: string = ""

    constructor(username: any, password: any) {
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

    async getBookings<TModel>(from: Date, offset: number){
        return await this.searchItems<TModel>("bookings", {
            include_guests: 'true',
            include_charges: 'true',
            include_door_codes: 'true',
            since_utc: from.toISOString(),
            limit: '100',
            offset: offset
        })
    }

    async getProperties<TModel>(from: Date, offset: number){
        return await this.searchItems<TModel>("properties", {
            limit: '100',
            offset: offset
        })
    }

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

