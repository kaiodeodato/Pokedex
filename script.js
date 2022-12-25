  async function resultado(){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=' + 206)
    return response.json()
  }



    resultado().then(allpokemon =>{

        var pokemons = [];

        allpokemon.results.map((item)=>{

            fetch(item.url)
            .then(response => response.json())
            .then(pokemomSingle => {

                if(pokemomSingle.base_experience < 113){

                    fetch(pokemomSingle.location_area_encounters)
                        .then(response => response.json())
                        .then(pokemomLocals => {
                            var locals = pokemomLocals
                    
                    pokemons.push({
                        name: pokemomSingle.name,
                        image: pokemomSingle.sprites.front_default,
                        base_experience:pokemomSingle.base_experience,
                        abilities: pokemomSingle.abilities,
                        locals: locals,
                        code: `<div class="cell">		
                            <h2 class="title">${pokemomSingle.name}</h2>
                            <img class="image" src="${pokemomSingle.sprites.front_default}" width="50" height="50">
                            <h4 class="power">${pokemomSingle.base_experience}</h4>
                            </div>`,
                        modal:`<div id="modal">
                        <div id="informations">
                            <h3 id="pokemonName">nome</h3>
                            <p id="base_experience">Base experience: ${pokemomSingle.base_experience}</p>
                            <p id="abilities">Abilities: ${[...pokemomSingle.abilities]}</p>
                            <p id="location_area">Location area: ${pokemomLocals}</p>
                        </div>
                        <img id="image_modal" src="${pokemomSingle.sprites.front_default}" width="200" height="200">
                    </div>`
                    })
                let layout = document.getElementById('layout');
                layout.innerHTML = (pokemons.map(item => item.code)).join('')

                })
                }

            })
        })
    })




    resultado().catch(err => console.error(err));


resultado()






