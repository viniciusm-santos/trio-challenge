import axios from 'axios'
import MailChimpProvider from '../providers/mailchimp.provider.js'

const ContactService = {
    async createList() {
        await this.deleteListIfExist()

        const newList = await MailChimpProvider.createList()
        const contacts = await this.getContacts()

        return await MailChimpProvider.addMembers(newList.id, contacts)
    },

    async deleteListIfExist() {
        const lists = await MailChimpProvider.getLists()

        if(lists && lists.length) await MailChimpProvider.deleteList(lists[0].id)
    },

    async getContacts() {
        return await axios.get('https://challenge.trio.dev/api/v1/contacts')
         .then(result => {
            return result.data
         })
    }
}

export default ContactService
