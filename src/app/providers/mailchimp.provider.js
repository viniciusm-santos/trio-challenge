import MailChimp from '../../config/mailchimp.js'

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
  
const MailChimpProvider = {
    async getLists() {
        const response = await MailChimp.lists.getAllLists();
        return response.lists
    },

    async createList() {
        try {
            const audience = await MailChimp.lists.createList({
                name: "Vinicius",
                contact: footerContactInfo,
                permission_reminder: "*|LIST:DESCRIPTION|*",
                email_type_option: true,
                campaign_defaults: campaignDefaults
            })
            return audience
        }
        catch (err) {
            console.log(err)
        }
    },

    async addMembers(listId, list) {
        const members = this.createMemberObject(list)

        try {
            return await MailChimp.lists.batchListMembers(listId, { members })
        }
        catch (err) {
            console.log(err)
        }
    },

    async deleteList(listId) {
        return await MailChimp.lists.deleteList(listId)
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
        return membersList
    } 
}

export default MailChimpProvider