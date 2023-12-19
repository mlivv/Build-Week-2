const url = 'https://striveschool-api.herokuapp.com/api/deezer/search';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0N2ZhODJjNmEwZDAwMTg0OTVmNmIiLCJpYXQiOjE3MDI2NTYxMjAsImV4cCI6MTcwMzg2NTcyMH0.S7mJfmwPwI0mA0Wv_RX0dqsvST9Uhf7baWaYKaJ2mM4';

function search() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {
        fetch(`${url}?q=${searchTerm}`)
            .then(response => response.json())
            .then(el => {
                if (el && el.data && el.data.length > 0) {
                    displayResults(el.data);
                } else {
                    alert('No results found.');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        alert('Please enter a search term.');
    }
}

function displayResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.innerHTML = `
        <div class="d-flex align-items-center gap-3">
        <div><img src="${result.album.cover}" alt="${result.album.title}" height= "60px"></div>
            <div>
                <p class="result-search-song fw-bold m-0 pb-0 fs-6" onclick="getToAlbumPage('${result.album.id}')" style="cursor: pointer;">${result.title}</p>
                <small class="result-search-artist" onclick="getToArtist('${result.artist.id}')" style="cursor: pointer; ">Song • ${result.artist.name}</small>
            </div>
        </div>
        <hr>
        `;
        searchResultsContainer.appendChild(resultElement);
    });
}


const getToArtist = id => {
    window.location.assign("./artist.html?Id=" + id);
    };


    const getToAlbumPage = id => {
        window.location.assign("/albumPage2/albumPage.html?Id=" + id);
    };
    

// Execute a function when the user presses a key on the keyboard
searchInput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("search-button").click();
  }
});