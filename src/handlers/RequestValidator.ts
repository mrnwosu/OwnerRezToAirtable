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
    
    static validateAuth(request: express.Request){

    }
}