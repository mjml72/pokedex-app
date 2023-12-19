const mainContainer = document.getElementById("main-container");
const btnLink = document.getElementsByClassName("btnLink");
let listPokemon = [];

for (let i = 0; i < btnLink.length; i++) {

    btnLink[i].addEventListener("click", (e) => {

        mainContainer.innerHTML = "";

        let typeId = e.currentTarget.id;

        if (typeId === "all") {
            for (const pokemon of listPokemon) {
                pokemonCard(pokemon);
            };
        } else {
            for (let i = 0; i < listPokemon.length; i++) {
                listPokemon[i].types.forEach(element => {
                    if (element.type.name === typeId) {
                        pokemonCard(listPokemon[i]);
                    }
                });
            }
        }
    });
}

function pokemonCard(pokemon) {

    let pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");

    let pokemonImgDiv = document.createElement("div");
    pokemonImgDiv.classList.add("pokemon-img");
    let pokemonImg = document.createElement("img");
    pokemonImg.src = `${pokemon.sprites.other["official-artwork"].front_default}`;
    pokemonImg.alt = `${pokemon.name}`;
    pokemonImgDiv.appendChild(pokemonImg);

    let pokemonInfo = document.createElement("div");
    pokemonInfo.classList.add("pokemon-info");

    let pId = document.createElement("p");
    pId.classList.add("id-pokemon");
    if (pokemon.id < 10) {
        pId.innerText = `#00${pokemon.id}`;
    } else if (pokemon.id < 100) {
        pId.innerText = `#0${pokemon.id}`;
    } else {
        pId.innerText = `#${pokemon.id}`;
    }
    let pName = document.createElement("h4");
    pName.classList.add("nombre-pokemon");
    pName.innerText = `${pokemon.name}`;

    let pokemonTypes = document.createElement("div");
    pokemonTypes.classList.add("pokemon-types");

    pokemon.types.forEach(element => {
        let type = element.type.name;
        let pTypes = document.createElement("p");
        pTypes.classList.add("type");
        pTypes.innerText = type;
        pokemonTypes.appendChild(pTypes);
    });

    let infos = document.createElement("div");
    infos.classList.add("infos");

    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    infos.appendChild(p1);
    infos.appendChild(p2);
    p1.innerText = `${pokemon.height / 10} m`;
    p2.innerText = `${pokemon.weight / 10} kg`;


    pokemonInfo.appendChild(pId);
    pokemonInfo.appendChild(pName)
    pokemonInfo.appendChild(pokemonTypes);
    pokemonInfo.appendChild(infos);

    pokemonCard.appendChild(pokemonImgDiv)
    pokemonCard.appendChild(pokemonInfo);

    mainContainer.appendChild(pokemonCard);

}

function list(data) {
    listPokemon.push(data);
}

async function fetchData() {
    for (let i = 1; i <= 151; i++) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            const data = await response.json();
            pokemonCard(data);
            list(data);
        } catch (error) {
            console.error(error);
        }

    }
}
fetchData();

