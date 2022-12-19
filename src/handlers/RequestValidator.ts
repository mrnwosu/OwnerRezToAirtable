import { WebhookData } from "../models/Webhooks/WebhookData"
import express from 'express'

export class RequestValidator{
    
    static validateRequestBody(data: any){
        try{
            return data as WebhookData 
        }
        catch{
            return null
        }
    }
    
    static validateAuth(req: express.Request){
        const orUusername = process.env.WEBHOOK_USERNAME
        const orPassword = process.env.WEBHOOK_PASSWORD

        const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
        const strauth = Buffer.from(b64auth, 'base64').toString()
        const splitIndex = strauth.indexOf(':')
        const username = strauth.substring(0, splitIndex)
        const password = strauth.substring(splitIndex + 1)
        return orUusername === username && orPassword === password
    }
}