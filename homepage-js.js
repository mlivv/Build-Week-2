const url= "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc3MzVlOWMwNTgzNTAwMTg1MjJjMzQiLCJpYXQiOjE3MDIzNzIxMjAsImV4cCI6MTcwMzU4MTcyMH0.M3xwRVlQWPhO7bbGx9CS9wFqiUHTqJ9jax6PuA_Yy7Y"
const headers = {
    "Authorization": token,
    "Accept": "application/json",
    "Content-Type": "application/json"
}


// barra musica in basso------------------------------------------------------------------------------------------------------------------------------------
const video = document.getElementById('myVideo');
const musicRange = document.getElementById('customRange3');
const playButtonCircle = document.querySelector('.bi-play-circle-fill');
const pauseButton = document.querySelector('.feather-skip-back');
const stopButton = document.querySelector('.feather-skip-forward');
const musicBar = document.getElementById('customRange3');
const volumeBar = document.getElementById('volumeRange'); // Aggiungi un ID al regolatore del volume nell'HTML

let isPlaying = false;
let hasBeenPlayed = false;

function togglePlayPause() {
  if (isPlaying) {
    video.pause();
  } else {
    if (!hasBeenPlayed) {
      video.currentTime = 0;
      hasBeenPlayed = true;
    }
    video.muted = false;
    video.play();
  }
  isPlaying = !isPlaying;
}

playButtonCircle.addEventListener('click', togglePlayPause);

pauseButton.addEventListener('click', function() {
  video.pause();
  isPlaying = false;
});

stopButton.addEventListener('click', function() {
  video.pause();
  video.currentTime = 0;
  isPlaying = false;
});

musicRange.addEventListener('input', function() {
  const time = video.duration * (musicRange.value / 5);
  video.currentTime = time;
});

function updateMusicBar() {
  const currentTime = video.currentTime;
  const duration = video.duration;
  musicBar.value = (currentTime / duration) * 5;
}

video.addEventListener('timeupdate', updateMusicBar);

musicBar.addEventListener('input', function() {
  const time = video.duration * (musicBar.value / 5);
  video.currentTime = time;
});

// Function to update volume and mute icon
function updateVolume(volume) {
  video.volume = volume;
  

  if (volume === 0) {
    volumeIcon.classList.remove('volume-max');
    volumeIcon.classList.add('volume-min');
  } else {
    volumeIcon.classList.remove('volume-min');
    volumeIcon.classList.add('volume-max');
  }
}

// Event listener for volume change
volumeBar.addEventListener('input', function() {
  const volumeValue = parseFloat(this.value);
  updateVolume(volumeValue / 5); // Normalizing volume value between 0 and 1
});

// Function to toggle mute/unmute
function toggleMute() {
  if (video.volume === 0) {
    updateVolume(0.5); // Set a default volume (e.g., 0.5)
  } else {
    updateVolume(0);
  }
}

// Event listener for mute icon click
document.getElementById('muteIcon').addEventListener('click', toggleMute);

  


//pulsante play che sta in alto------------------------------------------------------------------------------
//   // Seleziona il pulsante "Play"
 const playButton = document.querySelector('.play-btn');

 // Evento di click sul pulsante "Play"
 playButton.addEventListener('click', function() {
//   // Seleziona il video
  const video = document.getElementById('myVideo');
  
//   // Controlla se il video è in pausa
   if (video.paused) {
//     // Se è in pausa, avvia la riproduzione
     video.play();
   } else {
//     // Altrimenti, metti in pausa la riproduzione
    video.pause();
  }
});
//-----------------------------------------------------------------------------------------------RECUPERO----
// // Funzione per recuperare i dati dell'album dalla API di Deezer
// async function fetchAlbumData() {
//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: headers
//     });

//     if (response.ok) {
//       const albumData = await response.json();
//       return albumData; // Restituisce i dati dell'album recuperati
//     } else {
//       console.error("Impossibile recuperare i dati dell'album");
//       return null;
//     }
//   } catch (error) {
//     console.error("Errore nel recupero dei dati dell'album:", error);
//     return null;
//   }
// }

// // Funzione per generare 6 card casuali con i dati delle tracce dell'album------------------------------------------
// async function generateDynamicCards() {
//   const collectionContainer = document.querySelector('.collection');

//   // Ottieni i dati dell'album
//   const albumData = await fetchAlbumData();

//   if (albumData && albumData.tracks) {
//     const tracks = albumData.tracks.data; // Ottieni tutte le tracce dell'album

//     // Genera 6 indici casuali per selezionare 6 tracce casuali dall'album
//     const randomIndexes = Array.from({ length: 6 }, () => Math.floor(Math.random() * tracks.length));

//     randomIndexes.forEach((index) => {
//       const track = tracks[index];
//       const card = document.createElement('div');
//       card.classList.add('card', 'trend', 'p-3', 'sm-6', 'md-6');
//       card.style.width = '12rem';

//       const img = document.createElement('img');
//       img.src = track.album.cover_medium;
//       img.alt = '...';
//       img.classList.add('card-img-top');

//       const cardBody = document.createElement('div');
//       cardBody.classList.add('card-body', 'px-0');

//       const title = document.createElement('h6');
//       title.classList.add('d-block', 'text-truncate');
//       title.style.maxWidth = '150px';
//       title.innerText = track.title;

//       const description = document.createElement('small');
//       description.classList.add('card-text', 'text-secondary');
//       description.innerText = track.title_short;

//       cardBody.appendChild(title);
//       cardBody.appendChild(description);

//       card.appendChild(img);
//       card.appendChild(cardBody);

//       collectionContainer.appendChild(card);
//     });
//   } else {
//     // Nel caso in cui non si riescano a ottenere i dati dell'album
//     collectionContainer.innerText = "Impossibile recuperare i dati dell'album al momento.";
//   }
// }

// // Chiama la funzione per generare le card casuali quando la pagina è caricata
// window.onload = function () {
//   generateDynamicCards();
// };

//---------------------------------------------------------------------------------PER LA RICERCA-----
// function search() {
//   const searchInput = document.getElementById('searchInput');
//   const searchTerm = searchInput.value.trim();

//   if (searchTerm !== '') {
//       fetch(`${url}?q=${searchTerm}`)
//           .then(response => response.json())
//           .then(el => {
//               if (el && el.data && el.data.length > 0) {
//                   displayResults(el.data);
//               } else {
//                   alert('No results found.');
//               }
//           })
//           .catch(error => console.error('Error fetching data:', error));
//   } else {
//       alert('Please enter a search term.');
//   }
// }

// function displayResults(results) {
//   const searchResultsContainer = document.getElementById('searchResults');
//   searchResultsContainer.innerHTML = '';

//   results.forEach(result => {
//       const resultElement = document.createElement('div');
//       resultElement.innerHTML = `
//           <h1>Song: ${result.title}</h1>
//           <h2>Artist: ${result.artist.name}</h2>
//           <h3>Album: ${result.album.title}</h3>
//           <hr>
//       `;
//       searchResultsContainer.appendChild(resultElement);
//   });
// }


// --------------------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------------------------------------------------------------------------
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
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
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
  const card = document.createElement('a'); // Modifica per creare un elemento 'a' anziché un 'div'
  card.href = `artist.html?id=${artistData.id}`; // Imposta l'href con l'ID dell'artista

  const cardContent = document.createElement('div');
  cardContent.className = 'card trend p-3 sm-6 md-6 my-2';
  cardContent.style.width = '12rem';
  cardContent.innerHTML = `
      <img src="${artistData.picture_big}" class="card-img-top" alt="${artistData.name}">
      <div class="card-body">
          <h6 class="d-block text-truncate" style="max-width: 150px">${artistData.name}</h6>
          <small class="card-text"></small>       
      </div>
  `;
  
  card.appendChild(cardContent); // Aggiungi il contenuto della card al link 'a'
  return card;
}


function viewSongs(artistId) {
const container = document.getElementById(`songsContainer${artistId}`);

// Se l'elemento contiene già contenuto, lo rimuoviamo
if (container.innerHTML.trim() !== '') {
container.innerHTML = '';
return;
}

// Fetch per ottenere le canzoni dell'artista
fetch(`${artistUrl}${artistId}/top?limit=5`, { headers: { Authorization: token } })
.then(response => {
  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  const songsList = data.data.map(song => `<p>${song.title}</p>`).join('');
  container.innerHTML = `
      <div class="mt-3">
          <h6>Songs:</h6>
          ${songsList}
      </div>`;
})
.catch(error => console.error('Error fetching artist songs data:', error));

// Fetch per ottenere gli album dell'artista
fetch(`${artistUrl}${artistId}/albums`, { headers: { Authorization: token } })
.then(response => {
  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
})
.then(albumsData => {
  const albumsList = albumsData.data.map(album => `<p>${album.title}</p>`).join('');
  container.innerHTML += `
      <div class="mt-3">
          <h6>Albums:</h6>
          ${albumsList}
      </div>`;
})
.catch(error => console.error('Error fetching artist albums data:', error));
}


// Chiamata iniziale per ottenere e visualizzare 5 artisti casuali
window.onload = displayRandomArtists;
//-------------------------------------------------search della homepage---------------------------------------------


