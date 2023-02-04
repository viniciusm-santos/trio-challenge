
import { Router } from 'express';
import axios from 'axios';

const routes = new Router();

routes.get('/contacts/sync', (req, resp) => {
    axios.get('https://challenge.trio.dev/api/v1/contacts')
      .then(result => {
        resp.send(result.data)
      });
});

export default routes;