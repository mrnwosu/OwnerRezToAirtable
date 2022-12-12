export interface GuestModel{
    Id: number
    FirstName: string
    LastName: string
    Tags: string[]
}

export interface GuestSummary{
    FirstName: string
    LastName: string
    EmailAddress: string
    PhoneNumber: string
    AddressStreet1: string
    AddressStreet2: string
    AddressCity: string
    AddressStateId: number  //Nullable primitive
    AddressProvince: string
    AddressPostalCode: string
    AddressCountryId: number //Nullable primitive
    PhoneNumberInformal: string
    FullName: string
    FullNameEmail: string
    CompanyAndFullName: string
    Id: number
}