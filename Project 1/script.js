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



// ------------------- Popup / Modal -----------------

// Calling Elements
const modalLogin = document.querySelector('.modal-login');
const closeLoginModal = document.querySelector('.closeLoginModal')
const modalBtn = document.querySelector('#modal-btn');
const modalBtnAnchor = document.querySelector('#modal-btn-anchor');
const signupLink = document.querySelector('.signupLink');
const modalSignup = document.querySelector('.modal-signup')
const closeSignupModal = document.querySelector('.closeSignupModal')
const loginLink = document.querySelector('.loginLink');

const success = document.querySelector('.modal-success');
const closeSuccessBtn = document.querySelector("#closeSuccessBtn");

// Functions
const showLoginModal = () => modalLogin.style.display = 'block';
const hideLoginModal = () => {
  modalLogin.style.display = 'none';
  login.reset();
  loginUsernameError.innerText = "";
  loginPasswordError.innerText = "";
}
const showSignupModal = () => modalSignup.style.display = 'block';
const hideSignupModal = () => {
  modalSignup.style.display = 'none';
  register.reset();
  usernameError.innerText = "";
  emailError.innerText = "";
  passwordError.innerText = "";
  confirmPasswordError.innerText = "";
}



// Events for Modal / Pop-up
modalBtnAnchor.addEventListener('click', (e) => e.preventDefault);
modalBtn.addEventListener(
  'click',
  () => {
    showLoginModal();
  }
);
closeLoginModal.addEventListener('click', () => hideLoginModal());

signupLink.addEventListener(
  'click',
  (e) => {
    e.preventDefault();
    hideLoginModal();
    showSignupModal();
  }
)

closeSignupModal.addEventListener('click', () => hideSignupModal());

loginLink.addEventListener(
  'click',
  (e) => {
    e.preventDefault();
    hideSignupModal();
    showLoginModal();
  }
)


// SUCCESS Pop-up after sign-up
closeSuccessBtn.addEventListener(
  'click',
  () => {
    success.style.display = 'none';
    showLoginModal();
    login.reset();
  }
)







// -------------- MODAL FOR HOMEPAGE --------------------

// ------------- SIGN-UP Validation -----------------

// Calling Elements
const register = document.querySelector('#register');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password')
const confirmPassword = document.querySelector('#confirmPassword')

const usernameError = document.querySelector('#usernameError');
const emailError = document.querySelector('#emailError');
const passwordError = document.querySelector('#passwordError');
const confirmPasswordError = document.querySelector('#confirmPasswordError');

const logoutBtn = document.querySelector('#logoutBtn');

let usernameBool;
let emailBool;
let passwordBool;
let confirmPasswordBool;

// Functions
const validateUsername = () => {
  const userValue = username.value.trim();
  usernameError.innerText = "";
  if (!userValue) {
    usernameError.innerText = 'Username is required';
    usernameBool = false;
  }
  else if (userValue.length < 8 || userValue.length > 16) {
    usernameError.innerText = 'Username must be between 8 to 16 characters';
    usernameBool = false;
  } else {
    usernameBool = true;
  }
}

const validateEmail = () => {
  const emailValue = email.value.trim();
  const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  emailError.innerText = "";

  if (!emailValue) {
    emailError.innerText = 'Email is required';
    emailBool = false;
  }
  else if (!emailValidator.test(emailValue)) {
    emailError.innerText = 'Please enter a valid email';
    emailBool = false;
  } else {
    emailBool = true;
  }
}

const validatePassword = () => {
  const passwordValue = password.value;
  const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  passwordError.innerText = "";

  if (!passwordValue) {
    passwordError.innerText = "Password is required";
    passwordBool = false;
  }
  else if (!passwordValidator.test(passwordValue)) {
    passwordError.innerText = "Must contain at least 8 characters, a number & an uppercase letter";
    passwordBool = false;
  } else {
    passwordBool = true;
  }
}

const validateConfirmPassword = () => {
  const passwordValue = password.value;
  const confirmValue = confirmPassword.value;
  confirmPasswordError.innerText = "";
  if (passwordValue !== confirmValue) {
    confirmPasswordError.innerText = "Password does not match";
    confirmPasswordBool = false;
  } else {
    confirmPasswordBool = true;
  }
}

// Events for Sign Up Validation
register.addEventListener(
  'submit',
  (e) => {
    e.preventDefault();

    validateUsername();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    // JSON, Local Storage
    const user = {
      username: username.value,
      password: password.value,
      email: email.value,
    }

    const json = JSON.stringify(user);

    if (!usernameBool || !emailBool || !passwordBool || !confirmPasswordBool) {
      return;
    } else {
      hideSignupModal();
      localStorage.setItem("user", json);
      success.style.display = "block";
      register.reset();
      login.reset();
    }
  }
)

// ----------------- LOGIN Validation-----------------

// Calling Elements
const login = document.querySelector('#login');
const loginUsername = document.querySelector('#loginUsername');
const loginUsernameError = document.querySelector('#loginUsernameError');
const loginPassword = document.querySelector('#loginPassword');
const loginPasswordError = document.querySelector('#loginPasswordError');
const data =  JSON.parse( localStorage.getItem("user") );


let loginUserBool;
let loginPassBool;

// Functions
const validateLoginUsername = () => {

  const userLoginValue = loginUsername.value.trim();
  loginUsernameError.innerText = "";
  if (!userLoginValue) {
    loginUsernameError.innerText = 'Username is required';
    loginUserBool = false;
  }
  else if (userLoginValue !== data.username) {
    loginUsernameError.innerText = 'Wrong Username';
    loginUserBool = false;
  } else if (userLoginValue === data.username) {
    loginUserBool = true;
  } else {
    loginUserBool = true;
  }
}

const validateLoginPassword = () => {
  const passwordLoginValue = loginPassword.value;
  loginPasswordError.innerText = "";

  if (!passwordLoginValue) {
    loginPasswordError.innerText = "Password is required";
    loginPassBool = false;
  }
  else if (passwordLoginValue !== data.password) {
    loginPasswordError.innerText = "Wrong Password";
    loginPassBool = false;
  } else if (passwordLoginValue === data.password) {
    loginPassBool = true;
  }
  else {
    loginPassBool = true;
  }
}

// Events for Login Validation
login.addEventListener(
  'submit',
  (e) => {
    e.preventDefault();

    validateLoginUsername();
    validateLoginPassword();

    if (!loginUserBool || !loginPassBool) {
      return;
    } else {
      modalBtn.style.display = "none";
      logoutBtn.style.display = "block";
      hideLoginModal();
      login.reset();
    }

    console.log 
  }
)




// ----------------- Logout ---------------------------

const logoutConfirm = document.querySelector('#logoutConfirm');
const cancelLogout = document.querySelector('.cancel-logout');
const confirmLogout = document.querySelector('.confirm-logout');




logoutBtn.addEventListener(
  'click',
  () => {
    logoutConfirm.style.display = 'block';
  }
)

cancelLogout.addEventListener(
  'click',
  () => {
    logoutConfirm.style.display = 'none';
  }
)

confirmLogout.addEventListener(
  'click',
  () => {
    logoutConfirm.style.display = 'none';
    logoutBtn.style.display = 'none';
    modalBtn.style.display = 'block';
  }
)





















// 64331193d6ed49b2bdc8554adf188ea6
// https://api.rawg.io/

// const div = document.querySelector('#featured');
// const convertToTwoDigits = (digit) => { // ex) "2020/8/9" => "2020/08/09"
//   if (digit.toString().length < 2) {
//     digit = '0' + digit.toString();
//   } 
//   return digit;
// }
// const date = new Date();
// const year = date.getFullYear()
// const month = convertToTwoDigits(date.getMonth() + 1) // getMonth() returns previous month
// const day = convertToTwoDigits(date.getDate())
// const today = year + '-' + month + '-' + day
// const nextYear = year + 1 + '-' + month + '-' + day;
// const privateKey = '64331193d6ed49b2bdc8554adf188ea6';
// const proxyURL = 'https://cors-anywhere.herokuapp.com/';
// const oldUrl = `https://api.rawg.io/api/games?dates=2019-10-10,2020-10-10&ordering=-added`;
// const url = `https://api.rawg.io/api/games?key=${privateKey}&dates=${today},${nextYear}&ordering=-added`;
// console.log(url, proxyURL+url)


// const handleResponse = (response) => {
// 	return response.json()
//   .then(function (json) {
//     if (response.ok) {
//       return json;
//     } else {
//       return Promise.reject(response);
//     }
//   })
// }

// fetch(proxyURL+url)
//   .then(handleResponse)
//   .then((data) => {

//     data.results.map((game) => {

//     const card = document.createElement('div');
//     card.setAttribute('class','card');
//     const title = document.createElement('h2');
//     title.textContent = game.name;
//     card.appendChild(title);

//     if (game.background_image) {
//       const image = document.createElement('img');
//       image.src = game.background_image;
//       card.appendChild(image);
//     }      

//     if (game.released) {
//       let released = game.released;
//       released = released.split('-');
//       released.push(released.shift());
//       released = released.join('/');
//       const releaseDate = document.createElement('h4');
//       releaseDate.innerText = 'Release date: ' + released;
//       card.appendChild(releaseDate);
//     }

//     if (game.platforms) {
//       const gamePlat = document.createElement('p');
//       const platformText = document.createTextNode('Available on: ');
//       gamePlat.appendChild(platformText);     
//       let platformList = game.platforms.map(a => a.platform.name).join(", ");
//       let platforms = document.createTextNode(platformList);      
//       gamePlat.appendChild(platforms);
//       card.appendChild(gamePlat);
//     }

//     const gameGenre = document.createElement('p');
//     const genreText = document.createTextNode('Genres: ');
//     gameGenre.appendChild(genreText);    
//     let genreList = game.genres.map(a => a.name).join(", ");
//     let genres = document.createTextNode(genreList);      
//     gameGenre.appendChild(genres);
//     card.appendChild(gameGenre);

//     if (game.clip) {
//       const vid = document.createElement('video');
//       vid.controls = true;
//       vid.setAttribute('width', '100%');
//       vid.setAttribute('height', 'auto');
//       vid.load();
//       const vidSrc = document.createElement('source');
//       vidSrc.src = game.clip.clip;
//       vid.appendChild(vidSrc);
//       card.appendChild(vid);
//     } else {
//       const noClip = document.createElement('p');
//       const infoSoonText = document.createTextNode('More information coming soon.');
//       noClip.appendChild(infoSoonText)
//       card.appendChild(noClip)
//     }

//     div.appendChild(card);
//   })
// })
// .catch(function (error) {
//   console.log('error', error);
//   const card = document.createElement('div');
//   card.style.textAlign = 'center';
//   card.style.margin = '0 auto'
//   div.appendChild(card);
// })