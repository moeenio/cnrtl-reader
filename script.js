var domParser = new DOMParser();

var appProgressBar = document.querySelector(".app__progress-bar");
var appProgressBarLoaded = document.querySelector(".app__progress-bar__loaded-fraction");
var appBackButton = document.querySelector(".js-back-button");
var appForwardButton = document.querySelector(".js-forward-button");
var appMainSearch = document.querySelector(".js-app-main-search");
var dictContentHolder = document.querySelector(".js-dict-content");

var setLoadProgress = percent => {
  percent === 100 ? appProgressBar.classList.remove("visible") : appProgressBar.classList.add("visible");
  appProgressBarLoaded.style.width = percent + "%";
};

var getArticle = article => {
  dictContentHolder.innerHTML = "";
  setLoadProgress(50);
  fetch(`https://cors-anywhere.glitch.me/www.cnrtl.fr/definition/${article}`).
  then(response => response.text()).
  then(responseText => domParser.parseFromString(responseText, "text/html")).
  then(responseDOM => {
    setLoadProgress(90);
    console.log(responseDOM);
    var dictContent = responseDOM.getElementById("lexicontent").outerHTML || responseDOM.getElementById("contentbox").outerHTML;
    dictContentHolder.innerHTML = dictContent;
    setLoadProgress(100);
  });
};

appMainSearch.addEventListener("change", () => {
  getArticle(appMainSearch.value);
  history.pushState({ article: appMainSearch.value }, appMainSearch.value);
});

appBackButton.addEventListener("click", () => history.back());
appForwardButton.addEventListener("click", () => history.forward());

window.onpopstate = () => {
  getArticle(history.state.article);
};