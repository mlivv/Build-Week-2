const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NzJkMTJjNmEwZDAwMTg0OTVlZTUiLCJpYXQiOjE3MDI2NTQ1MzYsImV4cCI6MTcwMzg2NDEzNn0.WnoH3SBnfknooZB_pjcaeyWM6RT3HJh3JpiHOVWtT54";
/* let id = "4050205"; */
let id = "4050205"

let tracklist = [];

/* const searchParams = new URLSearchParams(window.location.search)
console.log(URLSearchParams);
const id = searchParams.get("Id") */

window.onload = () => {
  show();
}


function show(){
    fetch(url + id, {
        method: "GET",
        headers: {
        "Authorization": token
        }
        }).then(response => response.json())
        .then(data => {
          const artist = data;
          console.log(artist);
          showData(artist);
        })
        .catch(err => console.log(err))
}

let artistName = document.querySelectorAll(".artist-name");
let artistBanner = document.getElementById("artist-banner");
let artistIcon = document.getElementById("artist-icon");
let listeners = document.getElementById("listeners");
function showData(artista){
       artistName.forEach(element => {
        element.innerText = artista.name;
    });
    
    artistBanner.setAttribute("src", artista.picture_xl);
    artistIcon.setAttribute("src", artista.picture_small);
    listeners.innerText = artista.nb_fan.toLocaleString('it-IT', { style: 'decimal' });;

    fetch(artista.tracklist , {
        method: "GET",
        headers: {
        "Authorization": token
        }
        }).then(response => response.json())
        .then(data => {
          tracklist = data;
          console.log(tracklist);
          showSongs(tracklist.data);
        })
        .catch(err => console.log(err))
}


function showSongs(urlFinal){
  let arrayData =[];
    console.log(urlFinal);
    urlFinal.forEach((element) => {
      if(element.artist.id === Number(id)){
        return arrayData.push(element);
      }
    })
    console.log(arrayData);
   let closestSongs = arrayData.sort((a, b) => Math.abs(a.rank - 1000000) - Math.abs(b.rank - 1000000)).slice(0, 10);
   let firstFive = closestSongs.slice(0, 5);
   let secondFive = closestSongs.slice(5, 10);

 console.log(secondFive);
 topRanked(firstFive);
 topRankedCollapsed(secondFive);
} 

function topRanked(closestSongsArray){
  let popularSongsContainer = document.getElementById("artist-popolare-brani");
  popularSongsContainer.innerHTML = '';
  let number = 1;
  closestSongsArray.forEach(element =>{
    popularSongsContainer.innerHTML += `
    <div class="song-block d-flex align-items-center justify-content-between" onmouseover=" playButton(this)"  onmouseout="returnNormal(this)" onclick=" setSongBar(this, '${element.title}', '${element.artist.name}','${element.album.cover}','${element.preview}')">
    <div class="element-heading d-flex align-items-center gap-3">
        <span class="fs-4 number">
          ${number} 
        </span>
        <span class="play d-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
            </svg>
        </span>
        <img class="rounded-2" src="${element.album.cover}" alt="artist-album-image" height="55px">

        <div class=" d-flex flex-column px-0">
        <span class="fw-medium element-title">${element.title}</span>
        <span class="d-inline-block d-md-none fw-medium ascolti-text opacity-50">${element.rank.toLocaleString('it-IT', { style: 'decimal' })}</span>
        </div>
    </div>
    <div class="d-flex align-items-center gap-5">
    <span class="d-none d-md-inline-block fw-medium ascolti-text opacity-50">${element.rank.toLocaleString('it-IT', { style: 'decimal' })}</span>
      <span class="fw-medium time-text opacity-50">${timeConvert(element.duration)}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
      </svg>
    </div>
  </div>
    `
    number++;
  })

}

function topRankedCollapsed(closestSongsArray){
  let popularSongsContainer = document.getElementById("braniCollapse");
  popularSongsContainer.innerHTML = '';
  let number = 6;
  closestSongsArray.forEach(element =>{
    popularSongsContainer.innerHTML += `
    <div class="song-block d-flex align-items-center justify-content-between" onmouseover=" playButton(this)"  onmouseout="returnNormal(this)" onclick=" setSongBar(this, '${element.title}', '${element.artist.name}','${element.album.cover}','${element.preview}')">
    <div class="element-heading d-flex align-items-center gap-3">
        <span class="fs-4 number">
          ${number} 
        </span>
        <span class="play d-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
            </svg>
        </span>
        <img class="rounded-2" src="${element.album.cover}" alt="artist-album-image" height="55px">

        <div class=" d-flex flex-column px-0">
        <span class="fw-medium element-title">${element.title}</span>
        <span class="d-inline-block d-md-none fw-medium ascolti-text opacity-50">${element.rank.toLocaleString('it-IT', { style: 'decimal' })}</span>
        </div>
    </div>
    <div class="d-flex align-items-center gap-5">
    <span class="d-none d-md-inline-block fw-medium ascolti-text opacity-50">${element.rank.toLocaleString('it-IT', { style: 'decimal' })}</span>
      <span class="fw-medium time-text opacity-50">${timeConvert(element.duration)}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
      </svg>
    </div>
  </div>
    `
    number++;
  })

}

  
  let lastElement = null;

  function setSongBar(currentElement, title, name, cover, previewAudio) {
    if (lastElement !== currentElement) {
      if (lastElement) {
        lastElement.querySelector(".element-heading").classList.remove("color-green-play");
        lastElement.querySelector(".play").innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
          </svg>
        `;
      }
  
      currentElement.querySelector(".element-heading").classList.add("color-green-play");
      lastElement = currentElement;
  
      document.getElementById("album-cover-bar").innerHTML = `<img src="${cover}" alt="artist-album-image" height="60px">`;
      document.getElementById("title-artist-bar").innerHTML = name;
      document.getElementById("title-song-bar").innerHTML = title;
      document.getElementById("current-audio-played").innerHTML = `<audio src="${previewAudio}" class="audio"></audio>`;
    }
    
    playMusic();
  }
  
  
  
  let AudioIsPlaying = false;
  function playMusic() {
    let element = lastElement;
    let audio =  document.querySelector(".audio");
    if (!AudioIsPlaying) {
      audio.play();
      element.querySelector(".play").innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
    </svg>
      `;
      let playIcons = document.querySelectorAll(".play-icon-bar")
     playIcons.forEach(element => {
      element.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
    </svg>
      `;
     }); 
     AudioIsPlaying = true;
    
    } else {
      audio.pause();
      element.querySelector(".play").innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
      </svg>
      `;
      let pauseIcons = document.querySelectorAll(".play-icon-bar")
      pauseIcons.forEach(element => {
       element.innerHTML = `
       <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
       <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5"/>
     </svg>
       `;
      }); 
     AudioIsPlaying = false;
    }
    }

function timeConvert(num)
{
var minutes = Math.round(num / 60);
var seconds = (num % 60);
if (seconds < 10) {
seconds = + seconds * 10 ;
}
return minutes + ":" + seconds;
}

function playSongBar(title,name,cover){
  document.getElementById("album-cover-bar").innerHTML = `<img src="${cover}" alt="artist-album-image" height="60px">`;
  document.getElementById("title-artist-bar").innerHTML = name;
  document.getElementById("title-song-bar").innerHTML = title;
}


collapse = false;
function showMoreSongs(){
  if (collapse === false){
    document.getElementById("braniCollapse").classList.remove("d-none");
    document.getElementById("visualizza-altro").innerText = 'MOSTRA MENO'
    collapse = true;
  } else{
    document.getElementById("braniCollapse").classList.add("d-none");
    document.getElementById("visualizza-altro").innerText = 'VISUALIZZA ALTRO'
    collapse = false;
  }
}



function playButton(element){
  element.querySelector(".number").style.display = "none";
  element.querySelector(".play").classList.remove("d-none");
}
function returnNormal(element){
element.querySelector(".play").classList.add("d-none");
element.querySelector(".number").style.display = "inline-block";
}

