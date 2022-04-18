const mode = document.querySelector('.mode');
const icon = mode.firstElementChild;
const textIcon = mode.lastElementChild;


if(window.localStorage.getItem('body')) {
    document.body.classList.add(window.localStorage.getItem('body'));
    icon.src = window.localStorage.getItem('src');
    icon.alt = window.localStorage.getItem('alt');
    textIcon.textContent = window.localStorage.getItem('mode');
}

mode.addEventListener('click', setMode);
function setMode() {
    const modeSeted = mode.children[0];
    if(modeSeted.alt == 'light') {
        document.body.classList.add('dark');
        modeSeted.alt = 'dark';
        modeSeted.src = './source/icons/dark_.png';
        modeSeted.nextElementSibling.textContent = 'light mode';
        //local storage
        window.localStorage.setItem('body','dark');
        window.localStorage.setItem('alt','dark');
        window.localStorage.setItem('src','./source/icons/dark_.png');
        window.localStorage.setItem('mode','light mode');
    }else {
        document.body.classList.remove('dark');
        modeSeted.alt= 'light';
        modeSeted.src = './source/icons/light_.png';
        modeSeted.nextElementSibling.textContent = 'dark mode';
        //local storage
        window.localStorage.clear();
    }
}