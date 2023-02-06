import { Router } from 'express';
import controller from '../controllers/Contact.js';

const contactRoutes = new Router();
contactRoutes.get('/sync', controller.sync);

export default contactRoutes;

