const myUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=midnights";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDBkZDBkOGEyMDAwMThhNDhhNGQiLCJpYXQiOjE3MDE5NTc4NTQsImV4cCI6MTcwMzE2NzQ1NH0.W38iUAXjebNLy9CvXSaKb68lfzl8WCW3RC8HOAltgDY";
const headers = {
  Authorization: token,
  Accept: "application/json",
  "Content-Type": "application/json",
};

id = "368474187";

let album = [];

function getAlbum() {
  fetch(myUrl, {
    headers: headers,
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      let album = data;
      console.log(album);
      // popolaBanner(data);
      popolaCanzoni(data);
    })
    .catch((err) => console.log("Fetch error:", err));
}

window.onload = getAlbum();
/*
function popolaBanner() {
  let containerDatiAlbum = document.getElementById("containerDatiAlbum");
  containerDatiAlbum.innerHTML = "";
  fetch(myUrl, {
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      let albums = data.data;
      console.log(albums);
    })
    .catch((err) => console.log("Fetch error:", err));
      
    albums.forEach(element => {
      let newBoxSongs = `
        <img id="album_Cover" />
            <div id="containerTestoAlbum">
              <h2 class="text-white small">ALBUM</h2>
              <h1 class="text-white" id="album_Name">${element.data[0].album.title}</h1>
              <div class="align-items-center">
                <a
                  href="#"
                  class="d-flex text-white align-items-center"
                  id="linkArtista"
                >
                  <img
                    src="./assets/imgs/ab67616100005174859e4c14fa59296c8649e0e4.jpg"
                    class="rounded-circle me-3"
                    width="10%"
                  />
                  <p class="artist_Name">Artista</p>
                </a>
              </div>
            </div>  
        `;
        boxSongs.innerHTML += newBoxSongs;
    });
};
*/
function popolaCanzoni(album) {
  let boxSongs = document.getElementById("boxSongs");
  boxSongs.innerHTML = "";
  

  fetch(myUrl, {
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.data.length; i++) {
        let element = data.data[i];

        let newBoxSongs = `
        <div class="row"> 
          <div class="col-1">
            <p class="textColorSongs">${i + 1}</p>
          </div>
          <div class="col-5">
            <p class="small textColorSongs">${element.title}</p>
           
          </div>
          <div class="col-4">
            <p class="small textColorSongs">${element.rank}</p>
          </div>
          <div class="col-2">
            <p class="timeSong small textColorSongs">${element.duration}</p>
          </div>  
        </div>  
        `;
        boxSongs.innerHTML += newBoxSongs;
      }
    })
    .catch((err) => console.log("Fetch error:", err));
}

// function popolaBanner(artist) {
//   let albumName = document.getElementById("album_Name");
//   let albumCover = document.getElementById("album_Cover");
//   let artistName = document.getElementsByClassName("artist_Name");
//   let containerTestoAlbum = document.getElementById("containerTestoAlbum");
//   containerTestoAlbum.innerHTML = ""; // Pulisci il contenuto del container

//    artist.forEach((element) => {
//     let newContainerAlbum = `
//       <div class="album-container">
//         <h2 class="text-white small">ALBUM</h2>
//         <h1 class="text-white album-title">${element.album.title}</h1>
//         <div class="align-items-center">
//           <a href="#" class="d-flex text-white align-items-center" id="linkArtista">
//             <img src="${element.album.cover_small}" class="rounded-circle me-3" width="10%" />
//             <p class="artist_Name">${element.artist.name}</p>
//           </a>
//         </div>
//       </div>
//     `;
//     containerTestoAlbum.innerHTML += newContainerAlbum;

//     fetch(myUrl, {
//       headers: headers,
//     })
//       .then((res) => {
//         console.log(res);
//         return res.json();
//       })
//       .then((data) => {
//         let album = data;
//         console.log(album);
//         popolaBanner(data);
//       })
//       .catch((err) => console.log("Fetch error:", err));

//   });
// }