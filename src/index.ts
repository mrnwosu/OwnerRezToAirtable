import express, { response } from 'express'
import { RequestValidator } from './handlers/RequestValidator';
import { WebhookHandler } from './handlers/WebhookHandler';


const orUsername = process.env.WEBHOOK_USERNAME
const orPassword = process.env.WEBHOOK_PASSWORD
const ownerResUsername = process.env.OWNER_REZ_USERNAME
const ownerResPassword = process.env.OWNER_REZ_PERSONAL_ACCESS_TOKEN
const atApiKey = process.env.AIRTABLE_API_KEY
const atBaseId = process.env.AIRTABLE_BASE_ID

function validateEnvVariables(){
    if(!orPassword || !orUsername){
        throw 'Missing OwnerRez Credentials for webhook in environment variables'
    }

    if(!ownerResUsername || !ownerResPassword){
        throw "Missing Username Password for for API in environment variables"
    }

    if(!atApiKey || !atBaseId){
        throw "Missing Airtable Credentials in environment variables"
    }
    console.log("Environment variables validated ")
}

validateEnvVariables()

class ExceptionResponse{
    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode
        this.message = message
    }
    public statusCode: number = 0
    public message: string = ""
}

exports.handle_webhook = async (req:express.Request, res: express.Response)=> {
    try{
        if(!RequestValidator.validateAuth(req)){
            console.log('Recieved unauthorized request.')
            const failedAuthResponse = new ExceptionResponse(403, "Access Denied.")
            res.status(403).send(JSON.stringify(failedAuthResponse))
            return 
        }
        
        console.log(`Got data: ${JSON.stringify(req.body)}`)
        var data = RequestValidator.validateRequestBody(req.body)
        if(!data){
            const response = new ExceptionResponse(400, 'Invalid Data')
            res.status(response.statusCode).send(JSON.stringify(response))
            return
        }
        console.log('Web hook data validated')
        console.log('Handling requests')
        var result = await new WebhookHandler(
            String(process.env.OWNER_REZ_USERNAME),
            String(process.env.OWNER_REZ_PERSONAL_ACCESS_TOKEN),
            String(process.env.AIRTABLE_API_KEY),
            String(process.env.AIRTABLE_BASE_ID)
        ).handle_webhook(data)
        console.log(`Handler result: ${result}`)
        res.status(200).send(JSON.stringify({"Result": `${result}`}))
    }
    catch(err){
        const message = `ERROR: ${err}`
        console.log(message)
        const response = new ExceptionResponse(400, message)
        res.status(400).send(JSON.stringify(response))
    }
  };
