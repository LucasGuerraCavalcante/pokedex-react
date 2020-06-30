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
                    pokemons: data.pokemon_species
                }

                var names = []

                for (var i = 0; i < generation.pokemons.length; i++) {
                    names.push(generation.pokemons[i].name);
                }

                return response.json(names)
            })
            .catch(err => console.error(err))
    },

    async details(request: Request, response: Response) {
        const { name } = request.params;

        const url = `https://pokeapi.co/api/v2/pokemon/${name}`

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
