const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

navbarToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.remove("active");
    navbarToggler.classList.remove("active");
  });
}

// Search Toggle

const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const searchBox = document.querySelector("[data-search-box]");

for (let i = 0; i < searchTogglers.length; i++) {
  searchTogglers[i].addEventListener("click", function () {
    searchBox.classList.toggle("active");
  });
}

// Header

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});


// 64331193d6ed49b2bdc8554adf188ea6
// https://api.rawg.io/

const div = document.querySelector('#featured');
const convertToTwoDigits = (digit) => { // ex) "2020/8/9" => "2020/08/09"
  if (digit.toString().length < 2) {
    digit = '0' + digit.toString();
  } 
  return digit;
}
const date = new Date();
const year = date.getFullYear()
const month = convertToTwoDigits(date.getMonth() + 1) // getMonth() returns previous month
const day = convertToTwoDigits(date.getDate())
const today = year + '-' + month + '-' + day
const nextYear = year + 1 + '-' + month + '-' + day;
const privateKey = '64331193d6ed49b2bdc8554adf188ea6';
const proxyURL = 'https://cors-anywhere.herokuapp.com/';
const oldUrl = `https://api.rawg.io/api/games?dates=2019-10-10,2020-10-10&ordering=-added`;
const url = `https://api.rawg.io/api/games?key=${privateKey}&dates=${today},${nextYear}&ordering=-added`;
console.log(url, proxyURL+url)


const handleResponse = (response) => {
	return response.json()
  .then(function (json) {
    if (response.ok) {
      return json;
    } else {
      return Promise.reject(response);
    }
  })
}

fetch(proxyURL+url)
  .then(handleResponse)
  .then((data) => {

    data.results.map((game) => {

    const card = document.createElement('div');
    card.setAttribute('class','card');
    const title = document.createElement('h2');
    title.textContent = game.name;
    card.appendChild(title);

    if (game.background_image) {
      const image = document.createElement('img');
      image.src = game.background_image;
      card.appendChild(image);
    }      

    if (game.released) {
      let released = game.released;
      released = released.split('-');
      released.push(released.shift());
      released = released.join('/');
      const releaseDate = document.createElement('h4');
      releaseDate.innerText = 'Release date: ' + released;
      card.appendChild(releaseDate);
    }

    if (game.platforms) {
      const gamePlat = document.createElement('p');
      const platformText = document.createTextNode('Available on: ');
      gamePlat.appendChild(platformText);     
      let platformList = game.platforms.map(a => a.platform.name).join(", ");
      let platforms = document.createTextNode(platformList);      
      gamePlat.appendChild(platforms);
      card.appendChild(gamePlat);
    }

    const gameGenre = document.createElement('p');
    const genreText = document.createTextNode('Genres: ');
    gameGenre.appendChild(genreText);    
    let genreList = game.genres.map(a => a.name).join(", ");
    let genres = document.createTextNode(genreList);      
    gameGenre.appendChild(genres);
    card.appendChild(gameGenre);

    if (game.clip) {
      const vid = document.createElement('video');
      vid.controls = true;
      vid.setAttribute('width', '100%');
      vid.setAttribute('height', 'auto');
      vid.load();
      const vidSrc = document.createElement('source');
      vidSrc.src = game.clip.clip;
      vid.appendChild(vidSrc);
      card.appendChild(vid);
    } else {
      const noClip = document.createElement('p');
      const infoSoonText = document.createTextNode('More information coming soon.');
      noClip.appendChild(infoSoonText)
      card.appendChild(noClip)
    }

    div.appendChild(card);
  })
})
.catch(function (error) {
  console.log('error', error);
  const card = document.createElement('div');
  card.style.textAlign = 'center';
  card.style.margin = '0 auto'
  div.appendChild(card);
})