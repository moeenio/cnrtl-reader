const domParser = new DOMParser();

const app = document.querySelector(".app");
const appProgressBar = document.querySelector(".app__progress-bar");
const appProgressBarLoaded = document.querySelector(".app__progress-bar__loaded-fraction");
const appBackButton = document.querySelector(".js-back-button");
const appForwardButton = document.querySelector(".js-forward-button");
const appMainSearch = document.querySelector(".js-app-main-search");
const dictContentHolder = document.querySelector(".js-dict-content");
const dictError = document.querySelector(".js-dict-error")

function setLoadProgress (percent) {
  percent === 100 ? appProgressBar.classList.remove("visible") : appProgressBar.classList.add("visible");
  appProgressBarLoaded.style.width = percent + "%";
};

function loadArticle (article) {
  appMainSearch.value = article;
  dictContentHolder.innerHTML = "";
  dictError.style.display = "none";
  setLoadProgress(50);
  fetch(`https://cors-anywhere.herokuapp.com/www.cnrtl.fr/definition/${article}`)
  .then(response => response.text())
  .then(responseText => {
    const responseDOM = domParser.parseFromString(responseText, "text/html")
    setLoadProgress(90);
    const responseDictContent = responseDOM.getElementById("lexicontent").outerHTML;
    dictContentHolder.innerHTML = responseDictContent;
    setLoadProgress(100);
  })
  .catch(() => {
    setLoadProgress(100);
    dictError.style.display = "flex";
  });
};

appMainSearch.addEventListener("keyup", (e) => {
  app.classList.add("searching");
  if (e.key === "Enter") {
    const searchTerm = appMainSearch.value.trim();
    loadArticle(searchTerm);
    history.pushState({ article: appMainSearch.value }, appMainSearch.value);
    appMainSearch.blur();
  }
});

appMainSearch.addEventListener("blur", () => {
  app.classList.remove("searching");
})

appBackButton.addEventListener("click", () => history.back());
appForwardButton.addEventListener("click", () => history.forward());

window.onpopstate = () => {
  console.log("popstate");
  if (history.state) {
    loadArticle(history.state.article);
  }
  else {
    dictContentHolder.innerHTML = "";
    dictError.style.display = "none";
  }
};