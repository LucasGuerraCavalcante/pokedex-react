import { Request, Response } from 'express'
import fetch from 'node-fetch'

export default {

    async species(request: Request, response: Response) {
        const { id } = request.params;

        const url = `https://pokeapi.co/api/v2/generation/${id}`

        fetch(url, { method: 'get' })
            .then(res => res.json())
            .then(data => {

                // Formating Data

                // ---- Pokemons Names List ----

                const generation = {
                    pokemons: data.pokemon_species
                }

                var names = []

                for (var i = 0; i < generation.pokemons.length; i++) {
                    names.push(generation.pokemons[i].name);
                }

                names = names.sort()

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

                // Formating Data

                // ------ Abilities ------

                const mapAbilities = {
                    abilitiesArray: data.abilities
                }

                var abilitiesNames = []

                for (var i = 0; i < mapAbilities.abilitiesArray.length; i++) {
                    abilitiesNames.push(mapAbilities.abilitiesArray[i].ability.name)
                }

                abilitiesNames = abilitiesNames.sort()

                // ------ Types ------

                const mapTypes = {
                    typesArray: data.types
                }

                var typesNames = []

                for (var i = 0; i < mapTypes.typesArray.length; i++) {
                    typesNames.push(mapTypes.typesArray[i].type.name)
                }

                typesNames = typesNames.sort()


                const pokemon = {
                    id: data.id,
                    name: data.name,
                    height: data.height,
                    weight: data.weight,

                    img: data.sprites.front_default,
                    shinyImg: data.sprites.front_shiny,
    
                    abilities: abilitiesNames,
                    types: typesNames,
                }

                return response.json(pokemon)
            })
            .catch(err => console.error(err))
    }

} 
