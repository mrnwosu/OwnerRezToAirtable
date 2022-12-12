export interface FieldValueModel{
    code: string
    value: string
}

export interface ResponseModel<TModel>{
    count: number
    items: TModel[]
    next_page_url: string
    offset: number
}

export enum AddressType{
    Home = 1 , 
    Work = 2,
    Other= 3
}

export interface AddressModel
{
    city: string
    country: string
    id: number
    is_default: boolean
    postal_code: string
    province: string
    state: string
    street1: string
    street2: string
    type: AddressType
}

export enum ContactType{
    Home = 1,
    Work = 2,
    Mobile = 3,
    Other = 4
}

export interface EmailAddressModel{
    id: number
    is_default: boolean
    type: ContactType
    address: string
}

export interface PhoneModel{
    id: number 
    is_default: boolean
    number: string,
    type: ContactType
}