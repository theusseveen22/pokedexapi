buscarPokemon = async () => {
    const input = document.getElementById("input").value.toLowerCase();
    const retornoBusca = await fetchPokemonApi(input);
    const content = document.getElementById("content");
    clear();
    if (retornoBusca != null) {
        createCard(retornoBusca.sprites.front_default, retornoBusca.name, retornoBusca.abilities);
    } else {
        content.innerHTML = "<h3>Nenhum Pokemon encontrado, tente outra busca"
    }
}

const fetchPokemonApi = async (endPoint) => {
    try {
        const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${endPoint}`);
        const data = await api.json();
        return data;  
    } catch (error) {
        return null;
    } 
}

const createCard = (img, titulo, conteudo) => {
    const newDivCard = document.createElement("div");
    const content = document.getElementById("content");
    newDivCard.id = "card";

    const image = document.createElement("img");
    image.src = img;
        
    const childCreate = document.createElement("h2");
    childCreate.innerText = titulo;
        
    const createHability = document.createElement("h3");
    createHability.innerText = "Habilidades: ";

    newDivCard.appendChild(image);
    newDivCard.appendChild(childCreate);
    newDivCard.appendChild(createHability);
        
    conteudo.map((itens) => {
        const pItem = document.createElement("p");
        pItem.innerText = itens.ability.name;
        newDivCard.appendChild(pItem);
    });
    content.appendChild(newDivCard);
    createButton(titulo);
}

const clear = () => {
    const content = document.getElementById("content")
    content.innerText = "";
    const alvo = document.getElementById("card");
    if (alvo !== null) {
        content.removeChild(alvo);
    }
}

const saveOnCard = async (nome) => {
    const arr = [];
    const retornoBusca = await fetchPokemonApi(nome);
    const getCards = JSON.parse(localStorage.getItem('pokemons'));
    if (getCards === null) {
        arr.push(retornoBusca);
        localStorage.setItem('pokemons', JSON.stringify(arr));
    } else {
        getCards.push(retornoBusca);
        localStorage.setItem('pokemons', JSON.stringify(getCards));
    }
}

const createButton = (nome) => {
    const card = document.getElementById("card");
    const button = document.createElement("button");
    button.innerHTML = "Salvar";
    button.id = "buttonSave";
    button.setAttribute("onclick", `saveOnCard("${nome}")`);
    card.appendChild(button);
}

window.onload = () => {
    const getCardsPage = JSON.parse(localStorage.getItem('pokemons'));
    
    const divCard = document.getElementById("cards-itens");
    if (getCardsPage !== null) {
        getCardsPage.map((element) => {    
            const createCard = document.createElement("div");
            createCard.id = "cardItem"

            const image = document.createElement("img");
            image.src = element.sprites.front_default;
        
            const h2 = document.createElement("h4");
            h2.innerText = element.name;
        
            const h3 = document.createElement("h5");
            h3.innerText = "Habilidades: ";

            createCard.appendChild(image);
            createCard.appendChild(h2);
            createCard.appendChild(h3);

            element.abilities.map((itens) => {
                const pItem = document.createElement("p");
                pItem.innerText = itens.ability.name;
                createCard.appendChild(pItem);
            });
        divCard.appendChild(createCard);
        })
    } else {
        divCard.innerHTML = "<h2>Nennhum pokemon adicionado</h2>";
    }
}