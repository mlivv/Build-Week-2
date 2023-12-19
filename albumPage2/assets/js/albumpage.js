const myUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDBkZDBkOGEyMDAwMThhNDhhNGQiLCJpYXQiOjE3MDE5NTc4NTQsImV4cCI6MTcwMzE2NzQ1NH0.W38iUAXjebNLy9CvXSaKb68lfzl8WCW3RC8HOAltgDY";
const headers = {
  Authorization: token,
  Accept: "application/json",
  "Content-Type": "application/json",
};

/* id = "248216622"; */

const searchParams = new URLSearchParams(window.location.search)
// console.log(URLSearchParams);
const id = searchParams.get("Id")

let album = [];

function getAlbum() {
  fetch(myUrl + id, {
    headers: headers,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let album = data;
      console.log(album);
      popolaBanner(data);
      popolaCanzoni(data);
    })
    .catch((err) => console.log("Fetch error:", err));
}

window.onload = getAlbum();


function popolaBanner(artista) {
  let containerDatiAlbum = document.getElementById("containerDatiAlbum");
  containerDatiAlbum.innerHTML = "";

  fetch(myUrl + id, {
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      let album = data;
      let artist = data.artist;
      let releaseDate = album.release_date;
      let year = releaseDate.split("-")[0];
      creaCardBanner(album, artist, releaseDate, year);
    })
    .catch((err) => console.log("Fetch error:", err));

//crea card del banner con nome artista, cover ecc
  function creaCardBanner(album, artist, releaseDate, year) {
// funzione per cambiare minuti totali in minuti e secondi
    let durationInSeconds = album.duration;
    let formattedDuration = secondsToMinutes(durationInSeconds);
    function secondsToMinutes(durationInSeconds) {
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = durationInSeconds % 60;
      return `${minutes} min, ${seconds} sec.`;
    }

    let newContainerDatiAlbum = `
    
      <div class="col-12 col-md-3 col-lg-3 text-center">
        <img id="album_Cover" src="${album.cover_medium}" class="img-fluid mb-2" style="object-fit: cover"/>
      </div>
      <div id="containerTestoAlbum" class="col-12 col-md-9 col-lg-9">
        <h2 class="text-white small">ALBUM</h2>
        <h1 class="text-white" id="album_Name">${album.title}</h1>
          <a
              class="d-flex text-white align-items-center"
              id="linkArtista"
          >
            <img
                src="${artist.picture_small}"
                class="rounded-circle me-3"
                onclick="getToArtist('${album.artist.id}')"
            />
            <p class="artist_Name" onclick="getToArtist('${album.artist.id}')">${artist.name} • ${year} • ${album.nb_tracks} brani, ${formattedDuration} </p>
            </a>
        </div>
          `;
          
    containerDatiAlbum.innerHTML = newContainerDatiAlbum;
  }
};


const getToArtist = (id) => {
  window.location.assign("../artist.html?Id=" + id);
  };

// funzione per popolare la scatola delle canzoni
function popolaCanzoni(artista) {
  let boxSongs = document.getElementById("boxSongs");
  boxSongs.innerHTML = "";

  fetch(myUrl + id, {
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      let album = data;
      let tracklist = data.tracks.data;
      let artist = data.artist;
      let contributors = data.contributors;
      createCardSongs(album, artist, contributors, tracklist);
    })
    .catch((err) => console.log("Fetch error:", err));
}
let boxSongs = document.getElementById("boxSongs");
boxSongs.innerHTML = "";

function createCardSongs(album, artist, contributors, tracklist) {
  tracklist.forEach((element, index) => {
    let durationInSeconds = element.duration;
    let formattedDuration = secondsToMinutes(durationInSeconds);
// funzione per cambiare l'aspetto della durata di ogni canzone
    function secondsToMinutes(durationInSeconds) {
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = durationInSeconds % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    let newBoxSongs = `
          <div class="row"> 
            <div class="col-1">
              <p class="textColorSongs">${index + 1}</p>
            </div>
            <div class="col-5">
              <p class="small textColorSongs">${element.title}</p>
             
            </div>
            <div class="col-4">
              <p class="small textColorSongs">${element.rank}</p>
            </div>
            <div class="col-2">
              <p class="timeSong small textColorSongs">${formattedDuration}</p>
            </div>  
          </div>  
          `;

    boxSongs.innerHTML += newBoxSongs;
  });
}
