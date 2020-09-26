const domParser = new DOMParser();

// https://stackoverflow.com/a/4793630/10074924
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const termActions = document.importNode(
  document.getElementById("term-actions-tpl").content, true);
const app = document.querySelector(".app");
const appTitle = document.querySelector(".js-app-title");
const appProgressBar = document.querySelector(".app__progress-bar");
const appProgressBarLoaded = document.querySelector(".app__progress-bar__loaded-fraction");
const appBackButton = document.querySelector(".js-back-button");
const appForwardButton = document.querySelector(".js-forward-button");
const appMainSearch = document.querySelector(".js-app-main-search");
const appSearchButton = document.querySelector(".js-search-button");
const dictContentHolder = document.querySelector(".js-dict-content");
const dictContentSourceLink = () => document.querySelector(".js-source-link");
const dictError = document.querySelector(".js-dict-error")

function setLoadProgress (percent) {
  percent === 100 ? appProgressBar.classList.remove("visible") : appProgressBar.classList.add("visible");
  appProgressBarLoaded.style.width = percent + "%";
};

function loadArticle (article) {
  appTitle.textContent = article;
  dictContentHolder.innerHTML = "";
  dictError.style.display = "none";
  setLoadProgress(50);
  const termUrl = `https://www.cnrtl.fr/definition/${article}`;
  fetch(`http://locness-cors.duckdns.org/${termUrl}`)
  .then(response => response.text())
  .then(responseText => {
    const responseDOM = domParser.parseFromString(responseText, "text/html")
    const responseDictContent = responseDOM.getElementById("lexicontent").outerHTML;
    dictContentHolder.innerHTML = responseDictContent;

    const termTitle = dictContentHolder.querySelector(".tlf_cvedette");
    insertAfter(termTitle, termActions);
    dictContentSourceLink().href = termUrl;
    
    setLoadProgress(100);
  })
  .catch(() => {
    setLoadProgress(100);
    dictError.style.display = "flex";
  });
};

appSearchButton.addEventListener("click", (e) => {
  app.classList.add("searching");
  appMainSearch.focus();
})

appMainSearch.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (appMainSearch.value !== "") {
      const searchTerm = appMainSearch.value.trim();
      loadArticle(searchTerm);
      history.pushState({ article: appMainSearch.value }, appMainSearch.value);
      appMainSearch.blur();
    }
  }
});

appMainSearch.addEventListener("blur", () => {
  app.classList.remove("searching");
})

appBackButton.addEventListener("click", () => history.back());
appForwardButton.addEventListener("click", () => history.forward());

window.onpopstate = () => {
  if (history.state) {
    loadArticle(history.state.article);
  }
  else {
    appTitle.textContent = "";
    dictContentHolder.innerHTML = "";
    dictError.style.display = "none";
  }
};

window.onload = () => {
  if (history.state) {
    loadArticle(history.state.article);
  }
}