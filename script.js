/*
thanks for the idea of accessability 'tab' to : https://www.impressivewebs.com/accessible-keyboard-friendly-hamburger-menu-slide-out-navigation/
*/

// html style (tag), classes of wide nav & home header & container, mobile-menu (by id)
const htmlStyle = window.getComputedStyle(document.querySelector('html'));
const homeNav = document.querySelector('.home__nav');
const homeHeader = document.querySelector('.home__header');
const container = document.querySelector('.container');

// hard code inserting mobile nav & menu svg
container.insertAdjacentHTML('afterbegin',
     `<nav class="mobile__nav">
          <img src="img/close.svg" alt="close" class="mobile__svg_close" id="close">
          <a href="#home"><span class="mobile__item">Home</span></a>
          <a href="#about"><span class="mobile__item">About me</span></a>
          <a href="#skills"><span class="mobile__item">Skills</span></a>
          <a href="#portfolio"><span class="mobile__item">Portfolio</span></a>
          <a href="#contacts"><span class="mobile__item">Contacts</span></a>
      </nav>`);
homeHeader.insertAdjacentHTML('beforeend', `<a href="#" class="home__item4"><img src="img/menu.svg" alt="" id="mobile-menu"></a>`);

// inserted nav & menu btn & close btn & menu items list
const mobileNav = document.querySelector('.mobile__nav');
const mobileMenu = document.querySelector('#mobile-menu');
const close = document.querySelector('#close');
const mobileItems = document.querySelectorAll('.mobile__item');

//animation functions
function animateIn() {
    mobileMenu.addEventListener('click', (e) => {
            e.preventDefault();
            mobileNav.style.display = 'grid';
            setTimeout(() => {
                mobileNav.style.transform = 'translateX(0px)';
                mobileNav.style.transition = "0.8s";
            }, 100)
    })
}
function animateOut() {
    close.addEventListener('click', (e) => {
            e.preventDefault();
            mobileNav.style.transform = 'translateX(-1000px)';
            mobileNav.style.transition = "1s";

        // Check menu fully get out of screen 100ms interval & hide for tab
            setInterval(( () => {if(window.getComputedStyle(mobileNav)['transform'] == 'matrix(1, 0, 0, 1, -1000, 0)') {
                mobileNav.style.display = 'none';
            }}), 100)
    })
}

// event function
function menuopening() {

// media query 700px but scroll bar takes 16.8 px
    if(parseInt(htmlStyle['width']) < (700 - 16.8)) {

//      disable wide screen nav
        homeNav.style.display = "none";

//      click event mobile menu in
        animateIn();

//      click event mobile menu out
        animateOut();
    } else {

//      default wide screen menu
        homeNav.style.display = "flex";
        //dibable mobile when wide screen
        mobileNav.style.display = 'none'
    }
}

// listening function when window resized or on load
window.addEventListener('resize', menuopening)
window.addEventListener('load', menuopening)


// menu closing for each clicked menu item
Array.from(mobileItems).forEach(item => item.addEventListener('click', () => {
            mobileNav.style.transform = 'translateX(-1000px)';
            mobileNav.style.transition = "1s";
            setTimeout(() => mobileNav.style.display = 'none', 1000)
}))
