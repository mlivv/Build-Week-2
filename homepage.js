const url= "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDBkZDBkOGEyMDAwMThhNDhhNGQiLCJpYXQiOjE3MDE5NTc4NTQsImV4cCI6MTcwMzE2NzQ1NH0.W38iUAXjebNLy9CvXSaKb68lfzl8WCW3RC8HOAltgDY';

const headers = {
    "Authorization": token,
    "Accept": "application/json",
    "Content-Type": "application/json"
}

const video = document.getElementById('myVideo');
const musicRange = document.getElementById('customRange3');
const playButtonCircle = document.querySelector('.bi-play-circle-fill');
const pauseButton = document.querySelector('.feather-skip-back');
const stopButton = document.querySelector('.feather-skip-forward');
const musicBar = document.getElementById('customRange3');
const volumeBar = document.getElementById('volumeRange');

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

pauseButton.addEventListener('click', function () {
  video.pause();
  isPlaying = false;
});

stopButton.addEventListener('click', function () {
  video.pause();
  video.currentTime = 0;
  isPlaying = false;
});

musicRange.addEventListener('input', function () {
  const time = video.duration * (musicRange.value / 5);
  video.currentTime = time;
});

function updateMusicBar() {
  const currentTime = video.currentTime;
  const duration = video.duration;
  musicBar.value = (currentTime / duration) * 5;
}

video.addEventListener('timeupdate', updateMusicBar);

musicBar.addEventListener('input', function () {
  const time = video.duration * (musicBar.value / 5);
  video.currentTime = time;
});

// //FUNZIONE PER REGOLARE IL VOLUME
// function updateVolume(volume) {
//   video.volume = volume;


//   if (volume === 0) {
//     volumeIcon.classList.remove('volume-max');
//     volumeIcon.classList.add('volume-min');
//   } else {
//     volumeIcon.classList.remove('volume-min');
//     volumeIcon.classList.add('volume-max');
//   }
// }

// // Event listener for volume change
// volumeBar.addEventListener('input', function () {
//   const volumeValue = parseFloat(this.value);
//   updateVolume(volumeValue / 5); // Normalizing volume value between 0 and 1
// });

// // FUNZIONE PER GESTIRE L'ICONA DEL MUTO
// function toggleMute() {
//   if (video.volume === 0) {
//     updateVolume(0.5); 
//   } else {
//     updateVolume(0);
//   }
// }


// document.getElementById('muteIcon').addEventListener('click', toggleMute);




// //-----------------------------------------PULSANTE PLAY IN ALTO-------------------------------------

// const playButton = document.querySelector('.play-btn');

// // Evento di click sul pulsante "Play"
// playButton.addEventListener('click', function () {
 
//   const video = document.getElementById('myVideo');

  
//   if (video.paused) {
//       // Se è in pausa, avvia la riproduzione
//     video.play();
//   } else {
//     // Altrimenti, metti in pausa la riproduzione
//     video.pause();
//   }
// });
//-----------------------------------------------------------------------------------------------GET------------------------------------------------------------------------------------


const artistUrl = 'https://striveschool-api.herokuapp.com/api/deezer/artist/';


function getRandomArtistId() {
  const totalArtists = 10000; // Supponendo un numero elevato di artisti disponibili
  return Math.floor(Math.random() * totalArtists) + 1;
}

//crea un array di artisti random, per (count) di volte (che prende dalla funzione displayRandomArtist) poi viene inserito nell'array

function getRandomArtists(count) {
  const randomArtists = []; 
  for (let i = 0; i < count; i++) { 
    const randomArtistId = getRandomArtistId(); 
    randomArtists.push(randomArtistId);
  }
  return randomArtists;
}

// fetch dell'id di artisti e crea la card (funzione sotto)

function displayRandomArtists() {
  const randomArtists = getRandomArtists(10); 

  randomArtists.forEach(artistId => { 
    fetch(artistUrl + artistId, { headers: { Authorization: token } })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(artistData => {
        console.log(artistData);
        const artistCard = createArtistCard(artistData); 
        collectionContainer.appendChild(artistCard);
      })
      .catch(error => {
        console.error('Error fetching artist data:', error);
        // Se non riusciamo a ottenere le informazioni dell'artista, creiamo comunque una card con informazioni base
        const placeholderData = { 
          id: artistId,
          name: 'Unknown Artist',
          picture_big: 'https://upload.wikimedia.org/wikipedia/it/d/d6/Il_Signore_degli_Anelli_341.jpg'
        };
        const artistCard = createArtistCard(placeholderData);
        collectionContainer.appendChild(artistCard);
      });
  });
}


// Esegui la funzione per visualizzare le card degli artisti al caricamento della pagina
window.onload = displayRandomArtists;

function createArtistCard(artistData) {
  const card = document.createElement('a');
  // card.href = `artist.html?id=${artistData.id}`;
  card.classList.add('d-flex', 'align-items-stretch'); //classi bootsrap

  card.style.textDecoration = 'none'; 

  const cardContent = document.createElement('div');
  cardContent.className = 'card trend p-3 sm-6 md-6 my-2 d-flex flex-column';
  cardContent.style.width = '12rem';
  cardContent.style.minHeight = '200px';

  cardContent.innerHTML = `
      <img src="${artistData.picture_big}" class="card-img-top" alt="${artistData.name}">
      <div class="card-body px-0">
          <h6 class="card-title d-block text-truncate no-decoration mb-0" style="max-width: 150px" onclick="getToArtistPage('${artistData.id}')">${artistData.name}</h6>
          <small class="card-text no-decoration" id="songTitle${artistData.id}" style="display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"></small>       
      </div>
  `;

  card.appendChild(cardContent);
  return card;
}





function viewSongs(artistId) {
  const container = document.getElementById(`songsContainer${artistId}`);

  // Se l'elemento contiene già contenuto, lo rimuoviamo
  if (container.innerHTML.trim() !== '') {
    container.innerHTML = '';
    return;
  }


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






// simulazione scrittura dei testi nella nav di sinistra creata da flavia

   const paragraphs = document.querySelectorAll('.scroll p');

    function typeWriterEffect(element, text, speed) {
        let index = 0;
        const typing = setInterval(() => {
            element.textContent += text.charAt(index);
            index++;
            if (index > text.length) {
                clearInterval(typing);
            }
        }, speed);
    }

    paragraphs.forEach((paragraph, index) => {
        const originalText = paragraph.textContent.trim();
        paragraph.textContent = ''; // Svuota il paragrafo

        setTimeout(() => {
            typeWriterEffect(paragraph, originalText, 100); // 100 è la velocità di scrittura
        }, index * 2000); // Ritardo tra i paragrafi
    });


    const getToArtistPage = (id) =>{
      window.location.assign("./artist.html?Id=" + id)
    }