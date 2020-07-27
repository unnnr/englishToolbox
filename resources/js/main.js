
function initNavbar()
{
    function show()
    {
        navbar.classList.add(TOGGLE_ANIMATION);
        overlay.classList.add(NAVBAR_OVERLAY);
    }

    function hide()
    {
        navbar.classList.remove(TOGGLE_ANIMATION);
        overlay.classList.remove(NAVBAR_OVERLAY);
    }

    const TOGGLE_ANIMATION = 'navbar-mobile__links--slide';
    const NAVBAR_OVERLAY = 'navbar-mobile__overlay--visible';

    let navbar = document.querySelector('.navbar-mobile__links');
    let overlay = document.querySelector('.navbar-mobile__overlay');
    let showButton = document.querySelector('.navbar-mobile__button--show');
    let hideButton = document.querySelector('.navbar-mobile__button--hide');
    hideButton.onclick = hide;
    showButton.onclick = show;
}

initNavbar();