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
    getOptions(endPoint: string, data: any = null, params: any = null,  method: string = "GET", apiVersion: string = "V2"):AxiosRequestConfig{
        return {
            method: method,
            url: `${apiVersion === "V2" ? 'https://api.ownerreservations.com/v2/' : 'https://secure.ownerreservations.com/'}${endPoint}`,
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

    async getProperties<TModel>(from: Date, offset: number, apiVersion: string = 'V2'){
        return await this.searchItems<TModel>("properties", {
            limit: '100',
            offset: offset
        }, apiVersion)
    }

    //Guests
    async getGuestById<TModel>(guestId: number):  Promise<TModel>{
        return await this.getById('guests', guestId)
    }

    //Properties
    private async getById<TModel>(entityType: string, id:number): Promise<TModel> {
        var options = this.getOptions(`${entityType}/${id}`)
        return (await axios(options)).data
    }

    private async searchItems<TModel>(entityType: string, params: any, method: string = "GET", apiVersion: string = 'V2'): Promise<ResponseModel<TModel>>{
        var options = this.getOptions(entityType, null, params, method, apiVersion)
        return (await axios(options)).data
    }
}

