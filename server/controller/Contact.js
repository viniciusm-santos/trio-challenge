import axios from 'axios';

const Contact = {
  sync(request, response) {
    axios.get('https://challenge.trio.dev/api/v1/contacts')
      .then(result => {
        response.json(result.data)
    });
  }
}

export default Contact;