import mailchimp from '@mailchimp/mailchimp_marketing';
import * as dotenv from 'dotenv'
dotenv.config()

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_APPKEY,
    server: process.env.MAILCHIMP_SERVER,
});
  
const MailChimp = {
    async getLists() {
        const response = await mailchimp.lists.getAllLists();
        return response.lists;
    },

    async createList() {
        const footerContactInfo = { 
            company: "Vinicius", 
            address1: "Brilhante", 
            city: "Santana de Parnaiba",
            state: "SP",
            zip: "06506045",
            country: "Brazil"
        }

        const campaignDefaults = { 
            "from_name": "Vinicius", 
            "from_email": "vinicius.messiasdossantos@gmail.com", 
            "subject": "Trio's challenge", 
            "language": "en-US"
        }

        try {
            const audience = await mailchimp.lists.createList({
                name: "Vinicius",
                contact: footerContactInfo,
                permission_reminder: "*|LIST:DESCRIPTION|*",
                email_type_option: true,
                campaign_defaults: campaignDefaults
            })
            return audience.id
        }
        catch (err) {
            console.log(err)
        }
    },

    async addMembers(listId, list) {
        const membersList = this.createMemberObject(list);

        try {
            const response = await mailchimp.lists.batchListMembers(listId, {
                members: membersList,
                update_existing: true
            })
           return response
        }
        catch (err) {
            console.log(err)
        }
    },

    async deleteList(listId) {
        const response = await mailchimp.lists.deleteList(listId);
        return response;
    },
    
    createMemberObject(members) {
        const membersList = []

        members.forEach(member => {
            const memberDetails = {
                email_address: member.email,
                email_type: 'html',
                status: 'subscribed',
                merge_fields: {
                    FNAME: member.firstName,
                    LNAME: member.lastName
                }
            }
            membersList.push(memberDetails)
        })

        return membersList;
    } 
}

export default MailChimp;