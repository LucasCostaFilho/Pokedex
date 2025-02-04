const pokeApi = {}

function converPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    const types = pokeDetail.types.map((typesSlot) => typesSlot.type.name)
    const [type] = types
   
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(converPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 50) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}