document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('card-container');
  const mainHeader = document.getElementById('main-header');
  async function fetchCharacters() {
    try {
      const sortedPage = getRandomPage();
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${sortedPage}`);
      const data = await response.json();
      displayPageHeader(sortedPage);
      displayCharacters(data.results);
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
    }
  }

  function displayCharacters(characters) {
    characters.forEach(character => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <div class="card-content">
          <h3>${character.name}</h3>
          <p>Status: ${character.status}</p>
          <p>Espécie: ${character.species}</p>
        </div>
      `;

      cardContainer.appendChild(card);
    });
  }

  function displayPageHeader(page) {
    const title = document.createElement('h1');
    const description = document.createElement('p');

    title.textContent = `Página ${page}`;
    description.textContent = 'Recarregue para ver novos personagens.';

    mainHeader.appendChild(title);
    mainHeader.appendChild(description);
  }

  function getRandomPage() {
    const max = 42;
    const min = 1;
    return Math.floor(Math.random() * max) + min;
  }

  fetchCharacters();
});
