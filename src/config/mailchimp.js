import MailChimp from '@mailchimp/mailchimp_marketing'
import * as dotenv from 'dotenv'
dotenv.config()

MailChimp.setConfig({
    apiKey: process.env.MAILCHIMP_APPKEY,
    server: process.env.MAILCHIMP_SERVER,
})

export default MailChimp