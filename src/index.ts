import { BookingDto } from './models/airtable-dto-v1/bookings-dto';
import { BookingsModelV2 } from './models/owner-rez-models-v2/BookingsModels';
import { GuestModelV2 } from './models/owner-rez-models-v2/GuestModels';
import AirtableService from './services/AirtableService';
import { OwnerBizApiService, ModelConverter } from './services/OwnerBizApiService';

//Getting API Secrets Stored in environment variables
const ownerResUsername = process.env.OWNER_REZ_USERNAME
const ownerResPassword = process.env.OWNER_REZ_PASSWORD
const atApiKey = process.env.OWNER_RES_AT_API_KEY
const atBaseId = process.env.OWNER_RES_AT_BASE_ID

if(!ownerResUsername || !ownerResPassword){
    throw "No Username or password in environment variable"
}

if(!atApiKey || !atBaseId){
    throw "Missing Airtable Credentials"
}

const TABLE_NAMES = {
    PROPERTIES: "PA Properties - Test",
    BOOKINGS: "PA Bookings - Test"
}

//Creating Services
const  obService = new OwnerBizApiService(ownerResUsername, ownerResPassword)

const doWork = async() => {
    // var booking = await obService.getBookingById<BookingsModelV2>(5419548)

    var bookingsResults = await obService.getBookings<BookingsModelV2>(new Date())
    for(const booking of bookingsResults.items){
        try{
            var dto = await getBookingDto(booking)
            var atService = new AirtableService(atApiKey, atBaseId)
            console.log(dto)
            await atService.createRecord(TABLE_NAMES.BOOKINGS, dto)        
        }
        catch(err){
            console.error(err)
        }
    }
}

async function getBookingDto(booking: BookingsModelV2): Promise<BookingDto>{
    var guest = await obService.getGuestById<GuestModelV2>(booking.guest_id)
    var dtoForAirtable = ModelConverter.bookingToDio(booking)
    dtoForAirtable.guest_first_name = guest.first_name
    dtoForAirtable.guest_last_name = guest.last_name
    
    if(guest.addresses ){
        let first = guest.addresses[0]
        dtoForAirtable.guest_address = `${first.street1} ${first.street2} - ${first.city}, ${first.state}, ${first.postal_code}`
    }

    if(guest.email_addresses){
        dtoForAirtable.guest_email = guest.email_addresses[0].address
    }
    
    if(guest.phones){
        dtoForAirtable.guest_phones = guest.phones[0].number
    }
    return dtoForAirtable
}

doWork().catch((err) =>{
    console.log(err)
})