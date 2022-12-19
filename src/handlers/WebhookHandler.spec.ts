import { expect, should } from "chai"
import { WebhookHandler } from "../handlers/WebhookHandler"
import { WebhookData } from "../models/Webhooks/WebhookData"

describe('Webhook Handler E2E Tests', ()=>{
    
    let handler: WebhookHandler
    before(()=>{
        const ownerResUsername = String(process.env.OWNER_REZ_USERNAME)
        const ownerResPassword = String(process.env.OWNER_REZ_PERSONAL_ACCESS_TOKEN)
        const atApiKey = String(process.env.AIRTABLE_API_KEY)
        const atBaseId = String(process.env.AIRTABLE_BASE_ID)
        handler = new WebhookHandler(ownerResUsername, ownerResPassword, atApiKey, atBaseId)
    })
    let data: WebhookData
    describe('Bookings', ()=>{
        
        before(()=> {
        data = JSON.parse(`{
                    "id": 12345,
                    "user_id": 56789,
                    "action": "entity_update",
                    "entity_type": "booking",
                    "entity_id": 6703607
                }`) as WebhookData
        })      
        
        it("Should create record that doesn't exists", async () =>{
            var result = await handler.handle_webhook(data)
            result.should.equal('Record not in Airtable. Booking Created')
        })
    })
})