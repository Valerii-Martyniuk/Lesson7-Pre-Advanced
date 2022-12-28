const getS = (name) => document.querySelector(name);
const getAll = (name) => document.querySelectorAll(name);
let serchText = "";
let data = "";
let dataInfo = "";
let info = "";
let fName = "";
async function get() {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${serchText}&apikey=4ec6bd37`
    );
    data = await response.json();
    return data;
  } catch (err) {
    return console.log(err);
  }
}

getS(".inp-btn").onclick = async () => {
  serchText = await getS(".inp-text").value;
  await get();
  getS(".filmsTable").innerHTML = ``;
  for (let i = 0; i < data.Search.length; i++) {
    getS(".filmsTable").innerHTML += `<div class="card">
    <div class="divId">${data.Search[i].imdbID}</div>
    <div class="CardImg">
      <img
        src="${data.Search[i].Poster}"
        class="imgtype"
      />
    </div>
    <div class="CardNameFilm">
      <h2>${data.Search[i].Title}</h2>
    </div>
    <div class="CardFilmTipe"><h4>${data.Search[i].Type}</h4></div>
    <div class="CardFilmYear"><h4>${data.Search[i].Year}</h4></div>
    <div class="CardButton">
      <button class="Card-btn" >More Details</button>
    </div>
  </div>`;
  }
  let a = getAll(".Card-btn");
  for (let i = 0; i < a.length; i++) {
    a[i].addEventListener("click", function () {
      info = this.parentElement.parentElement.firstElementChild.textContent;
      fName =
        this.parentElement.parentElement.firstElementChild.nextElementSibling
          .nextElementSibling.textContent;
      infoLoad();
    });
  }
};

async function take() {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${info}&apikey=4ec6bd37`
    );
    dataInfo = await response.json();
    return dataInfo;
  } catch (err) {
    return console.log(err);
  }
}
async function infoLoad() {
  await take();
  getS(".mainInfoFilm").innerHTML = ` <div class="infoFilm">
  <img
    src="${dataInfo.Poster}"
    class="infoFilmImg"
  />
  <div class="infoFilmText">
    <div class="infoTitle"><h3>${fName}</h3></div>
    <p>
    ${dataInfo.Plot}
    </p>
    <p><span>Written by: </span>${dataInfo.Writer}</p>
    <p><span>Director : </span>${dataInfo.Director}</p>
    <p><span>Runtime: </span>${dataInfo.Runtime}</p>
    <p><span>BoxOffice: </span>${dataInfo.BoxOffice}</p>
    <p><span>Awards: </span>${dataInfo.Awards}</p>
    <p><span>Rating: </span></p>
    <p>${dataInfo.Ratings[0].Source}</p>
    <p>${dataInfo.Ratings[0].Value}</p>
   
  </div>
</div>`;
  getS(".mainInfoFilm").style.display = "flex";
  getS(".mainInfoFilm").style.top = `${window.scrollY}px`;
}

getS(".mainInfoFilm").onclick = () => {
  getS(".mainInfoFilm").style.display = "none";
};

window.addEventListener("scroll", function () {
  getS(".mainInfoFilm").style.top = `${window.scrollY}px`;
});
