// var objeto = JSON.parse(texto);
//limite 1152
//limite utilizavel 984
let pokemonsAmount = 897

addEventListener('keydown',check)
function check(e){
    switch(e.key){
        case 'Enter':
            carregar_pokemons();
            break;
    }
}


const api_url = 'https://pokeapi.co/api/v2/pokemon?limit=' + pokemonsAmount;

let locais = [];
let pokemons = [];
let poder_maximo = 504
let tempo_loading = 500 + pokemonsAmount * 4

fetch(api_url)
.then(data => data.json())
.then(data => data.results)
.then((data) => {
    data.map((item) => {
        fetch(item.url)
        .then(data => data.json())

        // .then(data => console.log(data))

        .then((data) => {
            
                fetch(data.location_area_encounters)
                .then(data => data.json())
                .then(data => locais.push(data))
                
                if(data.base_experience < poder_maximo){
                let habilidades_cada = (data.abilities.map(item=>item.ability.name)).join(' ');
                pokemons.push({
                    nome: data.name,
                    image: data.sprites.front_default,
                    habilidades: habilidades_cada,
                    poder: data.base_experience,
                    code:`<div class="carta" onclick="abrir('${data.name}')">
                            <h2 id="title_carta" class="title_carta">${data.name}</h2>
                            <img id="img_carta"  class="img_carta" src="${data.sprites.front_default}">
                            <p id="power_carta" class="power_carta">${data.base_experience}</p>
                        </div>`
                });
            }
        })
    })
    return data.map(item => item.url)
})

setTimeout(()=>{
    let locais_filtrado = locais.map((item)=>{
        return (item.map(item => item.location_area.name)).join(' ')
    })
        let cont = 0
        let pokemons_new = pokemons.map((item) => {
                item.locais = locais_filtrado[cont];
                item.modal = `<div id="modal">
                                <div class="modal_window">
                                    <div id="informations">
                                        <h2 id="title_modal">${item.nome}</h2>
                                        <h3>Abilities</h3>
                                        <p id="abilities">${item.habilidades}</p>
                                        <h3>Locations</h3>
                                        <p id="locations">${item.locais}</p>
                                        <p id="power_modal">${item.poder}</p>
                                    </div>
                                    <div id="old_card">
                                        <img id="img_modal" src="${item.image}">
                                    </div>
                                </div>
                            </div>`
                cont += 1
        } )
    let div_cartas = document.getElementById('div_cartas');
    div_cartas.innerHTML = (pokemons.map(item => item.code)).join('')

    console.log(pokemons)
},tempo_loading)
setTimeout(()=>{
    let loading_space = document.getElementById('loading_space');
    loading_space.style.display = 'none'
},tempo_loading)

let modal_back = document.querySelector('.modal_back').addEventListener('click',fechar)

function abrir(pok){
    let modal_back = document.getElementById('modal_back')

        modal_back = document.getElementById('modal_back')
        modal_back.style.display = 'flex'

        let pokemom_coletado = pokemons.filter(item => item.nome == pok)
        let pokemom = pokemom_coletado[0]
        modal_back.innerHTML = pokemom.modal
    }

function fechar(){
    modal_back = document.getElementById('modal_back')
    modal_back.style.display = 'none'

}
