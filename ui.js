const navList = document.querySelector('.nav-list');
const menuBtnIcon = document.querySelector('#menuBtnIcon');

export function toggleNav() {
    navList.classList.toggle('hidden');
    menuBtnIcon.classList.toggle('la-times');
}

export function closeNav() {
    navList.classList.add('hidden');
    menuBtnIcon.className = 'las la-bars';
}

export function clearNewsGrid() {
    const newsGrid = document.querySelector('.news-grid');
    const newsArticles = Array.from(newsGrid.children);
    newsArticles.forEach((article) => article.remove());
}

export function displayNotification(message) {
    const notificationBar = document.querySelector('.notification');
    const messageContainer = document.querySelector('#message-container');
    const notificationMessage = document.createElement('p');

    notificationMessage.innerText = `${message}`;
    messageContainer.appendChild(notificationMessage);

    notificationBar.classList.add('show-notification');

    setTimeout(() => {
        notificationBar.classList.add('hide-notification');
        notificationMessage.innerText = '';
        notificationBar.classList = 'notification';
    }, 1300);
}

export function getCategoryName(target) {
    const catTitle = document.querySelector('.category-title');
    const catTitleIcon = document.querySelector('#categoryTitleIcon');

    // Add appropriate icon for category
    switch (target.text.toLowerCase()) {
        case 'general news':
            catTitleIcon.className = 'las la-newspaper';
            break;
        case 'business':
            catTitleIcon.className = 'las la-briefcase';
            break;
        case 'entertainment':
            catTitleIcon.className = 'las la-film';
            break;
        case 'health':
            catTitleIcon.className = 'las la-heartbeat';
            break;
        case 'science':
            catTitleIcon.className = 'las la-flask';
            break;
        case 'sports':
            catTitleIcon.className = 'las la-basketball-ball';
            break;
        case 'technology':
            catTitleIcon.className = 'las la-robot';
            break;
        case 'my bookmarks':
            catTitleIcon.className = 'las la-bookmark';
            break;
    }

    // Add category name to DOM
    catTitle.innerText = `${target.text}`;

    // Return category name
    return target.text;
}
