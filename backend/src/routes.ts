import { Router } from 'express'

import pokeAPIController from './controllers/pokeAPIController'

const routes = Router()

routes.get('/generation/:id/species', pokeAPIController.species )
routes.get('/pokemon/:name', pokeAPIController.details )

export default routes