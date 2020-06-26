import { Request, Response } from 'express'
import fetch from 'node-fetch'

export default {

    async species(request: Request, response: Response) {
        const { id } = request.params;

        const url = `https://pokeapi.co/api/v2/generation/${id}`

        fetch(url, { method: 'get' })
            .then(res => res.json())
            .then(data => {
                const generation = {
                    id: data.id,
                    name: data.name,
                    mainRegion: data.main_region.name,
                    pokemons: data.pokemon_species
                } 

                return response.json(generation)
            })
            .catch(err => console.error(err))
    },

    async details(request: Request, response: Response) {
        const { id } = request.params;

        const url = `https://pokeapi.co/api/v2/pokemon/${id}`

        fetch(url, { method: 'get' })
            .then(res => res.json())
            .then(data => {

                const pokemon = {
                    id: data.id,
                    name: data.name,
                    height: data.height,
                    weight: data.weight,
                    types: data.types,
                    stats: data.stats,
                    sprites: {
                        male: data.sprites.front_default,
                        female: data.sprites.front_female,
                        shinyMale: data.sprites.front_shiny,
                        shinyFemale: data.sprites.front_shiny_female,
                    },
                    abilities: data.abilities
                }

                return response.json(pokemon)
            })
            .catch(err => console.error(err))
    }

} 
