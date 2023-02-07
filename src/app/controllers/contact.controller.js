import ContactService from '../services/contact.service.js'

const ContactController = {
  async sync(request, response) {
    const createMemberList = await ContactService.createList()

    response.json(createMemberList)
  }
}

export default ContactController