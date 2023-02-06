import axios from 'axios';
import mailChimp from '../services/mailchimp.js'

const Contact = {
  async sync(request, response) {
    const lists = await mailChimp.getLists();

    let listId = '';

    if(lists && lists.length) { 
      listId = lists[0].id
    } else {
      listId = await mailChimp.createList();
    } 

    const contacts = await axios.get('https://challenge.trio.dev/api/v1/contacts')
      .then(result => {
          return result.data
      });

    const addMembers = await mailChimp.addMembers(listId, contacts);

    response.json(addMembers)
  }
}

export default Contact;