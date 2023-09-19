const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const closeModalBtn = document.querySelector('#close-modal')

const maxRecords = 151
const limit = 5
let offset = 0;


function convertPokemonToLi(pokemon) {
 
    return `

        <li onclick="openModal()" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">

                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

            
        </li>

        <div id="modal" class="hidden">

            <div class="modal-main" >
                 <button onclick="closeModal()" id="close-modal">close</button>
                <div class="modal-header">
                <p class="number">#${pokemon.number}</p>
                <h2 class="name">${pokemon.name}</h2>
                    </div>

                    <div class="modal-details">
                        <ol>
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="">    
                    </div>
            
                             <div class="modal-body">
                                <ul>
                                        <li>teste</li>
                                        <li>teste</li>
                                        <li>teste</li>
                                        <li>teste</li>
                                </ul>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, vitae alias dolore magnam asperiores incidunt aut cupiditate, accusantium architecto quod similique
                                        , totam nostrum! In perferendis sed id magni quidem maxime?
                                    </p>     
                            </div>
        
            </div>
        </div>
        
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

    })
}


function openModal(){
    const overlay = document.querySelector('#fade')
    const modal = document.querySelector('#modal')
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")

}

function closeModal(){
    const overlay = document.querySelector('#fade')
    const modal = document.querySelector('#modal')
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

