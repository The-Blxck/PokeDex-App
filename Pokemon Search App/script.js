const input = document.getElementById("pokemonInput");
const button = document.getElementById("searchBtn");
const cards = document.getElementById("cards");

input.addEventListener("keydown", e => {
    if (e.key === "Enter") button.click();
});

button.addEventListener("click", async () => {
    const pokemonName = input.value.toLowerCase().trim();
    if (!pokemonName) return;

    cards.innerHTML = "";

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Pokémon not found");

        const data = await response.json();

        const name = data.name;
        const image = data.sprites.front_default;
        const types = data.types.map(t => t.type.name);

        const card = document.createElement("div");
        card.className = "card";

        let typeBadges = "";
        types.forEach(type => {
            typeBadges += `<span class="type ${type}">${type}</span>`;
        });

        card.innerHTML = `
            <img src="${image}" alt="${name}">
            <h3>${name}</h3>
            <p>${typeBadges}</p>
        `;

        cards.appendChild(card);

    } catch (error) {
        cards.innerHTML = `<p>${error.message}</p>`;
    }

    input.value = "";
});
