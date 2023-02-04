import { Router } from 'express';
import controller from '../controller/Contact.js';

const contactRoutes = new Router();
contactRoutes.get('/sync', controller.sync);

export default contactRoutes;

