const url= "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc3MzVlOWMwNTgzNTAwMTg1MjJjMzQiLCJpYXQiOjE3MDIzNzIxMjAsImV4cCI6MTcwMzU4MTcyMH0.M3xwRVlQWPhO7bbGx9CS9wFqiUHTqJ9jax6PuA_Yy7Y"
const headers = {
    "Authorization": token,
    "Accept": "application/json",
    "Content-Type": "application/json"
}
const artistUrl = 'https://striveschool-api.herokuapp.com/api/deezer/artist/';


function getRandomArtistId() {
  const totalArtists = 10000; // Supponendo un numero elevato di artisti disponibili
  return Math.floor(Math.random() * totalArtists) + 1;
}

function getRandomArtists(count) {
  const randomArtists = [];
  for (let i = 0; i < count; i++) {
      const randomArtistId = getRandomArtistId();
      randomArtists.push(randomArtistId);
  }
  return randomArtists;
}

function displayRandomArtists() {
  const randomArtists = getRandomArtists(20); // Visualizzeremo 5 artisti
  const collectionContainer = document.querySelector('.collection'); // Seleziona l'elemento con la classe 'collection'

  randomArtists.forEach(artistId => {
      fetch(`${artistUrl}${artistId}`, { headers: { Authorization: token } })
          .then(response => {
              return response.json();
          })
          .then(artistData => {
              console.log(artistData);
              const artistCard = createArtistCard(artistData);
              collectionContainer.appendChild(artistCard); // Aggiungi la card dell'artista al container 'collection'
          })
          .catch(error => console.error('Error fetching artist data:', error));
  });
}

function createArtistCard(artistData) {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card', 'trend', 'p-3', 'sm-6', 'col-12', 'col-md-4', 'col-lg-3');
  cardContainer.style.width = '12rem'; // Imposta la larghezza desiderata
  cardContainer.onclick = function(){
    return getToArtistPage(artistData.id);
 }
 
  const image = document.createElement('img');
  image.src = artistData.picture_big;
  image.classList.add('card-img-top', 'cardImage');
  image.alt = artistData.name;

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body', 'px-0');

  const title = document.createElement('h6');
  title.classList.add('card-title', 'd-block', 'text-truncate', 'no-decoration', 'mb-0');
  title.style.maxWidth = "150px";
  title.textContent = artistData.name;

  const smallElement = document.createElement('small');
  smallElement.classList.add('card-text', 'd-block', 'no-decoration', 'text-truncate');
  title.style.maxWidth = "150px";
  smallElement.id = `songTitle${artistData.id}`;

  cardBody.appendChild(title);
  cardBody.appendChild(smallElement);

  // Aggiunta delle icone
  const iconsContainer = document.createElement('div');
  iconsContainer.classList.add('d-flex', 'justify-content-between', 'iconeBoot');

  const iconGroup1 = document.createElement('div');
  iconGroup1.innerHTML = `
    <i class="bi bi-heart-fill " style="color: #00bb5b;"></i>
    <i class="bi bi-three-dots-vertical"></i>
  `;

  const playIcon = document.createElement('div');
  playIcon.innerHTML = `<i class="bi bi-play-circle-fill"></i>`;

  iconsContainer.appendChild(iconGroup1);
  iconsContainer.appendChild(playIcon);

  cardContainer.appendChild(image);
  cardContainer.appendChild(cardBody);
  cardContainer.appendChild(iconsContainer);



  // Effettua la fetch delle canzoni dell'artista
  fetch(`${artistUrl}${artistData.id}/top?limit=5`, { headers: { Authorization: token } })
    .then(response => response.json())
    .then(data => {
      console.log(data.data)
      let song = data.data;
      const randomIndex = Math.floor(Math.random() * song.length);
      let randomSong = song[randomIndex].title;
      const smallElement = document.getElementById(`songTitle${artistData.id}`);
      smallElement.textContent = ` ${randomSong}`;
    })
    .catch(error => console.error('Error fetching top song data:', error));


  return cardContainer;
}


window.onload = displayRandomArtists;
const getToArtistPage = (id) =>  { 
  window.location.assign ("./artist.html?Id="+ id);
}



