
import { Router } from 'express'
import contactRoutes from './contact.route.js'

const routes = new Router()

routes.use('/contacts', contactRoutes)

export default routes