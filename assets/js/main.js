const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modalButton = document.getElementById('modalButton')
const modal = document.getElementById('modal')
const buttonClose = document.getElementById('buttonClose')

const maxRecords = 151
const limit = 10;
let offset = 0;

function loadPokemonsItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
        <button class="pokemonButton">
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        </button>
    `).join('')
    })
}

loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNexPage = offset + limit

    if(qtdRecordNexPage >= maxRecords) {
        const newLimit = qtdRecordNexPage - maxRecords
        loadPokemonsItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonsItens(offset, limit)
    }
})

modalButton.onclick = () => {
    modal.showModal()
}

buttonClose.onclick = () => {
    modal.close()
}