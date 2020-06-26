import { Request, Response } from 'express'
import fetch from 'node-fetch'

export default {

    async species(request: Request, response: Response) {
        const { id } = request.params;

        const url = `https://pokeapi.co/api/v2/generation/${id}`

        fetch(url, { method: 'get' })
            .then(res => res.json())
            .then(data => {
                const pokemons = data 
                return response.json(pokemons)
            })
            .catch(err => console.error(err))
    },

    async details(request: Request, response: Response) {
        const { id } = request.params;

        const url = `https://pokeapi.co/api/v2/pokemon/${id}`

        fetch(url, { method: 'get' })
            .then(res => res.json())
            .then(data => {
                const pokemon = data 
                return response.json(pokemon)
            })
            .catch(err => console.error(err))

    }

} 
