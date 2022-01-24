import { config } from './config.js';
import * as Utils from './utils.js';
import * as UI from './ui.js';

const newsGrid = document.querySelector('.news-grid');

// INITIALIZE APP
(function init() {
    // Get the current date
    document.querySelector('#currentDate').innerText = Utils.getCurrentDate();
    // Get default Category
    getNewsArticles('general');
})();

// LOAD EVENT LISTENERS
(function loadEventListeners() {
    // Listen for menu button
    document.querySelector('.menu-btn').addEventListener('click', UI.toggleNav);
    // Listen for bookmark button
    newsGrid.addEventListener('click', bookmarkNewsArticle);
    // Listen for nav links
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    navLinks.forEach((link) => {
        if (link.classList.contains('saved-bookmarks')) {
            link.addEventListener('click', (e) => {
                UI.clearNewsGrid();
                UI.closeNav();
                UI.getCategoryName(e.target);
                displayBookmarks();
                e.preventDefault();
            });
        } else {
            link.addEventListener('click', (e) => {
                UI.clearNewsGrid();
                UI.closeNav();
                getNewsArticles(UI.getCategoryName(e.target));
                e.preventDefault();
            });
        }
    });
    // Add Back To Top buton on scroll
    window.addEventListener('scroll', () => {
        const catBar = document.querySelector('#catBar');
        const topBtn = document.querySelector('.top-btn');
        let position = catBar.getBoundingClientRect();

        if (position.y <= 100) {
            topBtn.classList.remove('hidden');
        } else {
            topBtn.classList.add('hidden');
        }
    });
})();

// GET NEWS ARTICLES
async function getNewsArticles(category) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${config}`);
    const data = await res.json();

    data.articles.forEach((article) => {
        displayNewsArticles(article.urlToImage, article.title, article.author, article.source.name, article.description, article.url);
    });
}

// DISPLAY NEWS ARTICLE CARDS
function displayNewsArticles(img, title, author, source, desc, url) {
    // Check if article has an image
    if (img === null || img === '') {
        img = 'images/News_Chunk_Filler.svg';
    }
    // Check if article has an author
    if (author === null || author === '') {
        author = source;
    }
    // Check if description has content
    if (desc === null || desc === '') {
        desc = title;
    }

    const article = document.createElement('article');
    article.className = 'news-chunk flex flex-col';
    article.innerHTML = `
        <img class="news-chunk-img" src="${img}" alt="article image" />
        <div class="news-chunk-content">
            <h1>${title}</h1>
            <p class="small">${author}</p>
            <p>${desc}</p>
        </div>
        <div class="news-chunk-footer flex flex-center flex-space-between">
            <a href="${url}" class="read-now-btn" target="_blank"><i class="las la-external-link-square-alt"></i>Read Now</a>
            <button class="bookmark-btn"><i class="las la-bookmark"></i></button>
        </div>
    `;

    newsGrid.appendChild(article);
}

// BOOKMARK NEWS ARTICLE
function bookmarkNewsArticle(e) {
    if (e.target.parentElement.classList.contains('bookmark-btn')) {
        if (e.target.parentElement.hasAttribute('selected') === false) {
            // Add 'selected' attribute
            e.target.parentElement.setAttribute('selected', '');

            // Get bookmark title
            const title = e.target.parentElement.parentElement.parentElement.childNodes[3].firstElementChild.innerText;
            console.log(title);

            // Get bookmark URL
            const url = e.target.parentElement.parentElement.childNodes[1].href;
            console.log(url);

            // Get bookmark date
            const dateSaved = Utils.getCurrentDate();
            console.log(dateSaved);

            const bookmarkData = {
                title,
                url,
                dateSaved,
            };

            Utils.saveToLocalStorage(bookmarkData);

            // Display saved notification
            UI.displayNotification('Bookmark Saved');
        } else {
            // Remove 'selected' attribute
            e.target.parentElement.removeAttribute('selected');
            // Display removed notification
            UI.displayNotification('Bookmark Removed');

            // Delete Bookmark...
        }
    }
}

// DISPLAY BOOKMARK CARDS
function displayBookmarks() {
    let savedBookmarks;

    if (localStorage.getItem('savedBookmarks') === null) {
        savedBookmarks = [];

        const emptyMessage = document.createElement('h1');
        emptyMessage.innerText = 'No bookmarks yet...';

        newsGrid.appendChild(emptyMessage);
    } else {
        savedBookmarks = JSON.parse(localStorage.getItem('savedBookmarks'));
    }

    savedBookmarks.reverse(); // Change array to descending order

    savedBookmarks.forEach((bookmark) => {
        const title = bookmark.title;
        const url = bookmark.url;
        const date = bookmark.dateSaved;

        const bookmarkCard = document.createElement('article');
        bookmarkCard.className = 'news-chunk flex flex-col';
        bookmarkCard.innerHTML = `
            <div class="news-chunk-content">    
                <p class="small">${date}</p>
                <h1><a href="${url}" target="_blank">${title}</a></h1>
            </div>
            <div class="news-chunk-footer flex flex-center flex-space-between">
                <a href="${url}" class="read-now-btn" target="_blank"><i class="las la-external-link-square-alt"></i>Read Now</a>
                <button class="remove-bookmark-btn"><i class="las la-trash-alt"></i></button>
            </div>
        `;

        newsGrid.appendChild(bookmarkCard);
    });
}