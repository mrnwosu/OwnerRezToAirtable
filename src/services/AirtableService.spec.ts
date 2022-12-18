import { expect } from "chai"
import AirtableService from "./AirtableService"

describe('Should get records from airtable', () => {
    let airtableService: AirtableService
    const TABLE_NAMES = {
        PROPERTIES: "PA Properties - Test",
        BOOKINGS: "PA Bookings - Test"
    }

    before('Getting live services', ()=>{
        airtableService = new AirtableService(process.env.AIRTABLE_API_KEY, process.env.AIRTABLE_BASE_ID)
    })

    it('should return records from bookings', async ()=>{
        var records = await airtableService.getRecordsByFields(TABLE_NAMES['BOOKINGS'], {'id': '6715904'})
        expect(records).to.have.lengthOf(1)
    })

    
    it('should return records from properties', async ()=>{
        var records = await airtableService.getRecordsByFields(TABLE_NAMES['PROPERTIES'], {'id': '367728'})
        expect(records).to.have.lengthOf(1)
    })
})