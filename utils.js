// GET THE CURRENT DATE
function getCurrentDate() {
    return new Date().toDateString();
}

function saveToLocalStorage(bookmarkData) {
    let savedBookmarks;

    if (localStorage.getItem('savedBookmarks') === null) {
        savedBookmarks = [];
    } else {
        savedBookmarks = JSON.parse(localStorage.getItem('savedBookmarks'));
    }

    savedBookmarks.push(bookmarkData);

    localStorage.setItem('savedBookmarks', JSON.stringify(savedBookmarks));
}

export { getCurrentDate, saveToLocalStorage };
