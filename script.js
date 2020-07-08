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
          <a class="mobile__item_close" href="#home"><span class="mobile__item">Home</span><img src="img/close.svg" alt="close" class="mobile__svg_close" id="close"></a>
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

// event function
function menuopening() {

// media query 700px but scroll bar takes 16.8 px
    if(parseInt(htmlStyle['width']) < (700 - 16.8)) {

//      disable wide screen nav
        homeNav.style.display = "none";

//      click event mobile menu in
        mobileMenu.addEventListener('click', (e) => {
            e.preventDefault();
            mobileNav.style.display = 'flex';
            setTimeout(() => {
                mobileNav.style.transform = 'translateX(0px)';
                mobileNav.style.transition = "0.8s";
            }, 100)
        })

//      click event mobile menu out
        close.addEventListener('click', (e) => {
            e.preventDefault();
            mobileNav.style.transform = 'translateX(-1000px)';
            mobileNav.style.transition = "1s";
            setTimeout(() => mobileNav.style.display = 'none', 1000)
        })

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
