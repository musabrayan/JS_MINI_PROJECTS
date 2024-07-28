const API_KEY = "0ea2bdb2e0714ed0a010339f866ae4b0";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Technology"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    const bookmarkButton = cardClone.querySelector("#bookmark-button");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0, 60)}...`;
    newsDesc.innerHTML = `${article.description.slice(0, 150)}...`;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });

    if (isArticleBookmarked(article)) {
        bookmarkButton.textContent = "Unbookmark";
    } else {
        bookmarkButton.textContent = "Bookmark";
    }

    bookmarkButton.addEventListener("click", () => {
        toggleBookmark(article);
        if (isArticleBookmarked(article)) {
            bookmarkButton.textContent = "Unbookmark";
        } else {
            bookmarkButton.textContent = "Bookmark";
        }
    });
}

function isArticleBookmarked(article) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    return bookmarks.some(bookmarkedArticle => bookmarkedArticle.url === article.url);
}

function toggleBookmark(article) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const index = bookmarks.findIndex(bookmarkedArticle => bookmarkedArticle.url === article.url);
    if (index === -1) {
        bookmarks.push(article);
    } else {
        bookmarks.splice(index, 1);
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function showBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bindData(bookmarks);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = document.getElementById("bookmarks");
    curSelectedNav.classList.add("active");
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
