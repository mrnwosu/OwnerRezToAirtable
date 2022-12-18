import { FieldValueModel } from "./CommonModels"

export interface PropertiesLookup{
    Id: string
    Key: string
    Name: string
    ExternalName: string
    InternalCode: string
}

export interface PropertiesSearchFilter
{
    active: boolean
    availability_end_date: Date
    availability_start_date: Date
    include_fields: boolean,
    include_tags: boolean,
    payment_method_id: number
  }

  export interface PropertyModelV2{
    active: boolean
    display_order: number
    external_display_order: number
    external_name: string
    fields: FieldValueModel[]
    id: number
    internal_code: string 
    key: string //GUID
    name: string
    public_url: string
    tags: string[]
    thumbnail_url: string
  }