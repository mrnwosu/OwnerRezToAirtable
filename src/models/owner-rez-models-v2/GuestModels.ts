import { AddressModel,EmailAddressModel,FieldValueModel, PhoneModel } from './CommonModels';

export interface GuestModelV2{
    addresses: AddressModel[]
    email_addresses: EmailAddressModel[]
    fields: FieldValueModel[]
    first_name: string
    id: number
    last_name: string
    notes: string
    phones: PhoneModel[]
    tags: string[]
} 

export interface GuestPartialModel{
    first_name: string
    last_name: string
    id: number
}

export interface GuestSearchFilter{
    created_since_utc: Date
    include_fields: boolean
    include_tags: boolean
    q: string
}