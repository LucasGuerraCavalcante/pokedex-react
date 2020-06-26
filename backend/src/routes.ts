import { Router } from 'express'

import pokeAPIController from './controllers/pokeAPIController'

const routes = Router()

routes.get('/generation/:id/species', pokeAPIController.species )
routes.get('/pokemon/:id', pokeAPIController.details )

export default routes