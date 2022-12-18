import { BookingDto } from './models/AirtableDtos/BookingDto';
import { PropertyDto } from "./models/AirtableDtos/PropertyDto";
import { BookingsModelV2 as BookingModelV2 } from './models/owner-rez-models-v2/BookingsModels';
import { GuestModelV2 } from './models/owner-rez-models-v2/GuestModels';
import AirtableService from './services/AirtableService';
import { OwnerBizApiService } from './services/OwnerBizApiService';
import { ModelConverter } from "./models/AirtableDtos/ModelConverter";
import express from 'express'
import { PropertyModelV1 } from './models/owner-rez-models-v1/PropertyModelV1';
import { WebhookData } from './models/Webhooks/WebhookData';
import { ActionTypes } from './models/Webhooks/ActionTypes';
import { EntityTypes } from './models/Webhooks/EntityTypes';
import { PropertyModelV2 } from './models/owner-rez-models-v2/PropertyModels';
import { apiVersion } from 'airtable';


const ownerResUsername = process.env.OWNER_REZ_USERNAME
const ownerResPassword = process.env.OWNER_REZ_PERSONAL_ACCESS_TOKEN
const atApiKey = process.env.AIRTABLE_API_KEY
const atBaseId = process.env.AIRTABLE_BASE_ID

const obService = new OwnerBizApiService(ownerResUsername, ownerResPassword)
const atService = new AirtableService(atApiKey, atBaseId)

const TABLE_NAMES = {
    PROPERTIES: "PA Properties - Test - Google Test",
    BOOKINGS: "PA Bookings - Test - Google Test"
}

function validateEnvVariables(){
    console.log('Got a requests')
    if(!ownerResUsername || !ownerResPassword){
        return "No Username or password in environment variable"
    }

    if(!atApiKey || !atBaseId){
        return "Missing Airtable Credentials"
    }
    return null
}

const doWork = async() => {
    const date = new Date()
    date.setDate(date.getDate() - 60)
    await loadBookings(date, 10)
}

async function loadProperties(date: Date, max: number = Number.MAX_VALUE){
    let count = 0
    let offset = 0

    while(count < max){
        var propertyResults = await obService.getProperties<PropertyModelV1>(date, offset, 'V1')
        for(const props of propertyResults.items){
            try{
                var dto = await getPropertyDto(props)
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

async function loadBookings(date: Date, max: number = Number.MAX_VALUE){
    let count = 0
    let offset = 0

    while(count < max){
        var bookingsResults = await obService.getBookings<BookingModelV2>(date, offset)
        for(const booking of bookingsResults.items){
            try{
                var dto = await getBookingDto(booking)
                console.log(dto)
                // await atService.createRecord(TABLE_NAMES.BOOKINGS, dto)        
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
}

async function getPropertyDto(prop: PropertyModelV1): Promise<PropertyDto>{
    return new Promise<PropertyDto>((resolve, reject) => {
        var dto = ModelConverter.propertyToDto(prop)
        resolve(dto)
    })
}

async function getBookingDto(booking: BookingModelV2): Promise<BookingDto>{
    var dtoForAirtable = ModelConverter.bookingToDio(booking)
    
    if(!booking.guest_id) return dtoForAirtable    

    var guest = await obService.getGuestById<GuestModelV2>(booking.guest_id)
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

const main = async (req:express.Request, res: express.Response)=> {
    const failReason = validateEnvVariables()
    if(failReason){
        res.status(404).send(failReason)
    }

    try{
        console.log(`Got data: ${JSON.stringify(req.body)}`)
        var data = req.body as WebhookData 
        console.log('Past here')
        var result = ""
        switch(data.action){
            case(ActionTypes.entity_create):
                result = await handle_entity_create(data)
                break;
            case(ActionTypes.entity_update):
                result = await handle_entity_update(data)
                break;
            case(ActionTypes.entity_delete):
                result = await handle_entity_delete(data)
                break;
            case(ActionTypes.application_authorization_revoked):
                result = await handle_application_authorization_revoked(data)
                break;
            case(ActionTypes.webhook_test):
                result = await handle_webhook_test(data)
                break;
            default:
        }
        res.status(200).send(JSON.stringify({"Result": `${result}`}))
    }
    catch(err){
        const message = `ERROR: ${err}`
        console.log(message)
        res.status(400).send(message)
    }
  };

exports.handle_webhook = main

async function handle_entity_create(data: WebhookData): Promise<string>{
    switch(data.entity_type){
        case EntityTypes.booking:
            const bookingFromOz = await obService.getBookingById<BookingModelV2>(data.entity_id)
            const dto = getBookingDto(bookingFromOz)
            atService.createRecord(TABLE_NAMES.BOOKINGS, dto)
            return "Booking Created"            
        default:
            return "Entity type not yet supported"
    }
}

async function handle_entity_update(data: WebhookData): Promise<string>{
    switch(data.entity_type){
        case EntityTypes.booking:
            console.log('Booking from OZ')
            const bookingFromOz = await obService.getBookingById<BookingModelV2>(data.entity_id)
            console.log('Got Booking')

            const dto = getBookingDto(bookingFromOz)
            

            console.log('Checking if record exists ')
            const recordFromAirtable = await atService.getRecordsByFields(TABLE_NAMES.BOOKINGS, {'id': data.entity_id})

            if(recordFromAirtable &&  recordFromAirtable.length > 0){
                console.log('Booking record exists. Replacing row')
                atService.replaceRecord(TABLE_NAMES.BOOKINGS, dto)
                return "Booking Updated"            
            }
            else{
                console.log("Record doesn't exist. Creating")
                atService.createRecord(TABLE_NAMES.BOOKINGS, dto)
                return "Record not in Airtable. Booking Created"
            }
        default:
            return "Entity type not yet supported"
        }
}

async function handle_entity_delete(data: WebhookData){
    return "Delete not implemented yet"
}

async function handle_application_authorization_revoked(data: WebhookData){
    return "Revoke Authorization not implemented yet"
}

async function handle_webhook_test(data: WebhookData){
    const date = new Date()
    date.setDate(date.getDate() - 60)
    await loadBookings(date, 10)
    return "HELLO WORLD!!"
}
