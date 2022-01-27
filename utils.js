// GET THE CURRENT DATE
export function getCurrentDate() {
    return new Date().toDateString();
}

export function saveToLocalStorage(bookmarkData) {
    let savedBookmarks;

    if (localStorage.getItem('savedBookmarks') === null) {
        savedBookmarks = [];
    } else {
        savedBookmarks = JSON.parse(localStorage.getItem('savedBookmarks'));
    }

    savedBookmarks.push(bookmarkData);

    localStorage.setItem('savedBookmarks', JSON.stringify(savedBookmarks));
}

export function removeFromLocalStorage(title) {
    const newsGrid = document.querySelector('.news-grid');
    let savedBookmarks;

    if (localStorage.getItem('savedBookmarks') === null) {
        savedBookmarks = [];
    } else {
        savedBookmarks = JSON.parse(localStorage.getItem('savedBookmarks'));

        for (let i = 0; i < savedBookmarks.length; i++) {
            if (savedBookmarks[i].title === title) {
                savedBookmarks.splice(i, 1);
            }
        }
    }

    localStorage.setItem('savedBookmarks', JSON.stringify(savedBookmarks));

    if (savedBookmarks.length === 0) {
        const emptyMessage = document.createElement('h2');
        emptyMessage.innerText = 'No bookmarks found.';
        newsGrid.appendChild(emptyMessage);
    }
}
