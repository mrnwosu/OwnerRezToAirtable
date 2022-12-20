import { BookingDto } from "../models/AirtableDtos/BookingDto"
import { ModelConverter } from "../models/AirtableDtos/ModelConverter"
import { PropertyDto } from "../models/AirtableDtos/PropertyDto"
import { PropertyModelV1 } from "../models/owner-rez-models-v1/PropertyModelV1"
import { BookingModelV2 } from "../models/owner-rez-models-v2/BookingsModelV2"
import { GuestModelV2 } from "../models/owner-rez-models-v2/GuestModels"
import { ActionTypes } from "../models/Webhooks/ActionTypes"
import { EntityTypes } from "../models/Webhooks/EntityTypes"
import { WebhookData } from "../models/Webhooks/WebhookData"
import AirtableService from "../services/AirtableService"
import { OwnerBizApiService } from "../services/OwnerBizApiService"



export class WebhookHandler{

    obService: OwnerBizApiService 
    atService: AirtableService 
    TABLE_NAMES = {
        PROPERTIES: "PA Properties - Test - Google Test",
        BOOKINGS: "PA Bookings - Test - Google Test"
    }
    
    constructor(ownerRezUsername:string, ownerRezKey:string, atKey:string, atBaseId:string) {
        this.obService = new OwnerBizApiService(ownerRezUsername, ownerRezKey)
        this.atService = new AirtableService(atKey, atBaseId)
    }

    async handle_webhook(data: WebhookData){
        let result = ""
        switch(data.action){
            case(ActionTypes.entity_create):
                result = await this.handle_entity_create(data)
                break;
            case(ActionTypes.entity_update):
                result = await this.handle_entity_update(data)
                break;
            case(ActionTypes.entity_delete):
                result = await this.handle_entity_delete(data)
                break;
            case(ActionTypes.application_authorization_revoked):
                result = await this.handle_application_authorization_revoked(data)
                break;
            case(ActionTypes.webhook_test):
                result = await this.handle_webhook_test(data)
                break;
            default:
        }
        return result
    }

    async handle_entity_create(data: WebhookData): Promise<string>{
        switch(data.entity_type){
            case EntityTypes.booking:
                const bookingFromOz = await this.obService.getBookingById<BookingModelV2>(data.entity_id)
                const dto = await this.getBookingDto(bookingFromOz)
                console.log(dto)
                var result = await this.atService.createRecord(this.TABLE_NAMES.BOOKINGS, dto)
                console.log(result)
                return "Booking Created"            
            default:
                return "Entity type not yet supported"
        }
    }
    
    async handle_entity_update(data: WebhookData): Promise<string>{
        switch(data.entity_type){
            case EntityTypes.booking:
                console.log('Booking from OZ')
                const bookingFromOz = await this.obService.getBookingById<BookingModelV2>(data.entity_id)
                console.log('Got Booking')
    
                const dto = await this.getBookingDto(bookingFromOz)
                console.log(dto)
                return await this.saveOrUpdateBooking(dto)
            default:
                return "Entity type not yet supported"
            }
    }
    
    async handle_entity_delete(data: WebhookData){
        return "Delete not implemented yet"
    }
    
    async handle_application_authorization_revoked(data: WebhookData){
        return "Revoke Authorization not implemented yet"
    }
    
    async handle_webhook_test(data: WebhookData){
        const date = new Date()
        date.setDate(date.getDate() - 60)
        await this.loadBookings(date, 10)
        return "HELLO WORLD!!"
    }

    async loadProperties(date: Date, max: number = Number.MAX_VALUE){
        let count = 0
        let offset = 0
    
        while(count < max){
            var propertyResults = await this.obService.getProperties<PropertyModelV1>(date, offset, 'V1')
            for(const props of propertyResults.items){
                try{
                    var dto = await this.getPropertyDto(props)
                    console.log(dto)
                    // await atService.createRecord(TABLE_NAMES.PROPERTIES, dto)        
                }
                catch(err){
                    console.error(err)
                }
                count += 1
            }
            if(!propertyResults.next_page_url || count >= max) break
            offset += 100
        }
        console.log(`Created ${count} records`)
    }
    
    async loadBookings(date: Date, max: number = Number.MAX_VALUE){
        let count = 0
        let offset = 0
        
        while(count < max){
            var bookingsResults = await this.obService.getBookings<BookingModelV2>(date, offset)
            for(const booking of bookingsResults.items){
                try{
                    var dto = await this.getBookingDto(booking)
                    console.log(dto)
                    await this.saveOrUpdateBooking(dto)        
                }
                catch(err){
                    console.error(err)
                }
                count += 1
            }
            if(!bookingsResults.next_page_url || count >= max) break
            offset += 100
        }
        console.log(`Created ${count} records`)
        return true
    }
    
    async getPropertyDto(prop: PropertyModelV1): Promise<PropertyDto>{
        return new Promise<PropertyDto>((resolve, reject) => {
            var dto = ModelConverter.propertyToDto(prop)
            resolve(dto)
        })
    }
    
    async getBookingDto(booking: BookingModelV2): Promise<BookingDto>{
        var dtoForAirtable = ModelConverter.bookingToDto(booking)
        
        if(!booking.guest_id) return dtoForAirtable    
    
        var guest = await this.obService.getGuestById<GuestModelV2>(booking.guest_id)
        dtoForAirtable.guest_first_name = guest.first_name
        dtoForAirtable.guest_last_name = guest.last_name
        if(guest.addresses ){
            let first = guest.addresses[0]
            dtoForAirtable.guest_address = `${first.street1 ?? ""}${first.street2 ? " " + first.street2 : " "} ${first.city ?? ""}, ${first.state ?? ""}, ${first.postal_code ?? ""}`
        }
    
        if(guest.email_addresses){
            dtoForAirtable.guest_email = guest.email_addresses[0].address
        }
        
        if(guest.phones){
            dtoForAirtable.guest_phones = guest.phones[0].number
        }
        return dtoForAirtable
    }

    async saveOrUpdateBooking(dto: BookingDto): Promise<string>
    {
        console.log('Checking if record exists in airtable')
        const recordFromAirtable = await this.atService.getRecordsByFields(this.TABLE_NAMES.BOOKINGS, {'id': dto.id})
        if(recordFromAirtable &&  recordFromAirtable.length > 0){
            console.log('Booking record exists. Updating row')
            await this.atService.updateRecord(recordFromAirtable[0].id, this.TABLE_NAMES.BOOKINGS, dto)
            return "Booking Updated"            
        }
        else{
            console.log("Record doesn't exist. Creating")
            console.log(this.TABLE_NAMES.BOOKINGS, dto)
            await this.atService.createRecord(this.TABLE_NAMES.BOOKINGS, dto)
            return "Record not in Airtable. Booking Created"
        }
    }
}