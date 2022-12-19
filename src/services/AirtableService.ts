import  airtable from 'airtable'
import { FieldSet } from 'airtable/lib/field_set';
import { QueryParams } from 'airtable/lib/query_params';

export default class AirtableService{
    
    _base: airtable.Base;

    constructor(apiKey: any, baseId: any) {
        this._base = new airtable({apiKey:apiKey}).base(baseId)
    }

    async getRecordById(table: string, recordId:string){
        return await this._base(table).find(recordId)
    }

    async getRecordsByFields(table: string, fields:{}, pageSize: number = 20, pageNumber = 1){
        const options: QueryParams<FieldSet> = {}
        if (fields){
            options.filterByFormula = this.filterByFormulaBuilder(fields)
        } 

        options.pageSize = pageSize
        options.offset = (pageNumber-1) * pageSize 
        return await this._base(table).select(options).firstPage()
    }

    async createRecord(table: string, fields: any){
        return await this._base(table).create(fields)
    }

    async createRecordBulk(table: string, fields: any[]){
        return await this._base(table).create(fields)
    }


    async updateRecord(recordId: string, table: string, fields: any) {
        return await this._base(table).replace(recordId, fields)
    }

    filterByFormulaBuilder(fields:{}){
        let formula = ""
        let keys = Object.keys(fields)
        let values = Object.values(fields)
        if(keys.length == 0) return

        keys.forEach((key, i)=>{
            if(formula.length > 0){
                formula += ', '
            }
            formula += `{${key}} = "${values[i]}"` 
        })
        if(keys.length > 1){
            formula = `AND (${formula})`
        }        
        return formula
    }
}