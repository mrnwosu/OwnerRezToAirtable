import { assert, expect, should } from 'chai'
import { OwnerBizApiService } from './OwnerBizApiService'
import { BookingModelV2 } from '../models/owner-rez-models-v2/BookingsModelV2'

describe('Owner Rez Service Tests', ()=>{
    let obService: OwnerBizApiService
    
    before(()=>{ 
        obService = new OwnerBizApiService(process.env.OWNER_REZ_USERNAME, process.env.OWNER_REZ_PERSONAL_ACCESS_TOKEN)
    })

    it('Should get records from Owner Rez', async () =>{
        var result = await obService.getBookingById<BookingModelV2>(6696803)
        expect(result).to.have.property('id')
    })
})