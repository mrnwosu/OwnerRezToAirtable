import { BookingDto } from './BookingDto';
import { BookingStatus, BookingType } from '../owner-rez-models-v2/BookingsModels';
import { BookingModelV2 } from "../owner-rez-models-v2/BookingsModelV2";
import { PropertyModelV1 } from '../owner-rez-models-v1/PropertyModelV1';
import { PropertyDto } from './PropertyDto';

//Refactor this

export class ModelConverter {
    static bookingToDto(booking: BookingModelV2): BookingDto {
        let dto = new BookingDto();
        dto.adults = booking.adults;
        dto.arrival = booking.arrival;
        dto.id = booking.id;
        dto.booked_utc = booking.booked_utc;
        dto.check_in = booking.check_in;
        dto.check_out = booking.check_out;
        dto.children = booking.children;
        dto.currency_code = booking.currency_code;
        dto.departure = booking.departure;
        dto.guest_id = booking.guest_id;
        dto.infants = booking.infants;
        dto.is_block = Number(booking.is_block);
        dto.listing_site = booking.listing_site;
        dto.pets = booking.pets;
        dto.property_id = booking.property_id;
        dto.status = parseInt(BookingStatus[booking.status]);
        dto.total_amount = booking.total_amount;
        dto.total_paid = booking.total_paid;
        dto.total_owed = booking.total_owed;
        dto.type = parseInt(BookingType[booking.type]);
        if (booking.door_codes) {
            dto.door_code = booking.door_codes[0].code;
        }

        if (booking.charges) {
            dto.charges = JSON.stringify(booking.charges);
        }
        return dto;
    }
    
    static propertyToDto(prop: PropertyModelV1): PropertyDto{
        let dto = new PropertyDto()
        dto.id = prop.Id
        dto.name = prop.Name
        dto.externalName = prop.ExternalName
        dto.internalCode = prop.InternalCode
        dto.active = Number(prop.Active)
        dto.checkIn = prop.CheckIn
        dto.checkOut = prop.CheckOut
            dto.longitude = prop.Longitude
            dto.latitude = prop.Latitude
        if(prop.Address){
            dto.street1 = prop.Address.Street1
            dto.city = prop.Address.City
            dto.postalCode = prop.Address.PostalCode
            if(prop.Address.State){
                dto.alphaCode = prop.Address.State.AlphaCode
            }
        }
        return dto
    }
}
