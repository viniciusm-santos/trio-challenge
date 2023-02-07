import { Router } from 'express'
import ContactController from '../controllers/contact.controller.js'

const contactRoutes = new Router()
contactRoutes.get('/sync', ContactController.sync)

export default contactRoutes

