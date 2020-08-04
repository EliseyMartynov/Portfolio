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
     `<nav class="mobile__nav" style="display: none;">
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
            }, 10)
    })
}
function animateOut() {
    close.addEventListener('click', (e) => {
            e.preventDefault();
            mobileNav.style.transform = 'translateX(-1000px)';
            mobileNav.style.transition = "1s";

        // const of interval for check mobile-nav position to hide it
            let interval = setInterval(( () => {if(window.getComputedStyle(mobileNav)['transform'] == 'matrix(1, 0, 0, 1, -1000, 0)') {
                mobileNav.style.display = 'none';
            }}), 10);

            interval;

//    clearinterval timeout 1100ms because 1000ms transition time + 100ms to let interval time
            setTimeout((() => clearInterval(interval)), 1100);
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
window.addEventListener('DOMContentLoaded', menuopening)


// menu closing for each clicked menu item
Array.from(mobileItems).forEach(item => item.addEventListener('click', () => {
            mobileNav.style.transform = 'translateX(-1000px)';
            mobileNav.style.transition = "1s";
            setTimeout(() => mobileNav.style.display = 'none', 1000)
}))


//=======SLIDER======//

const slideRight = document.querySelector('#slider-right');
const slideLeft = document.querySelector('#slider-left');

//taking images arrays
const images = Array.from(document.querySelectorAll('.portfolio__link'));

//taking description spans arrays
const spanDesc = Array.from(document.querySelectorAll('.portfolio__spandesc'));

//==========================//

//    circles for slider

const circleBox = document.querySelector('.portfolio__circle');

//making circle as much as portfolio items

for(let i = 0; i < images.length; i++) {
    let newCircle = document.createElement('span');
    circleBox.appendChild(newCircle);
}

//taking array of circles
const circles = Array.from(document.querySelectorAll('.portfolio__circle span'));

// circle scales with selected image when page loads
let currentImage = images.find(img => img.classList.contains('portfolio__current'));
circles[images.indexOf(currentImage)].setAttribute('class', 'portfolio__circle_selected');

//==========================//

//slide on right
slideRight.addEventListener('click', toRight);

function toRight() {

    rightArrowImg();
    rightArrowSpan();
}

//    disable current and enable next IMAGE
    function rightArrowImg() {

            //    looking for current IMAGE
    let currentImage = images.find(img => img.classList.contains('portfolio__current'));

        currentImage.classList.remove('portfolio__current');
        currentImage.classList.add('portfolio__disabled');

//        condition if current is last?
        if(images.indexOf(currentImage) < (images.length - 1)){
        currentImage.nextElementSibling.classList.remove('portfolio__disabled');
        currentImage.nextElementSibling.classList.add('portfolio__current');

//        circle moving to right
        circles[images.indexOf(currentImage)].removeAttribute('class', 'portfolio__circle_selected');
        circles[images.indexOf(currentImage) + 1].setAttribute('class', 'portfolio__circle_selected');

        } else {
            images[0].classList.remove('portfolio__disabled');
            images[0].classList.add('portfolio__current');

//        circle moving to zero if current is last
        circles[images.indexOf(currentImage)].removeAttribute('class', 'portfolio__circle_selected');
        circles[0].setAttribute('class', 'portfolio__circle_selected');
        }
    }

//    disable current and enable next SPAN
    function rightArrowSpan() {

            //    looking for current SPAN
    let currentSpan = spanDesc.find(span => span.classList.contains('portfolio__current'));

        currentSpan.classList.remove('portfolio__current');
        currentSpan.classList.add('portfolio__disabled');

//        condition if current is last?
        if(spanDesc.indexOf(currentSpan) < (spanDesc.length - 1)){
        currentSpan.nextElementSibling.classList.remove('portfolio__disabled');
        currentSpan.nextElementSibling.classList.add('portfolio__current');
        } else {
            spanDesc[0].classList.remove('portfolio__disabled');
            spanDesc[0].classList.add('portfolio__current');
        }
    }


//slide on left

slideLeft.addEventListener('click', toLeft);

function toLeft() {
    leftArrowImg();
    leftArrowSpan();
}

//    disable current and enable next IMAGE
    function leftArrowImg() {

        //    looking for current IMAGE
    let currentImage = images.find(img => img.classList.contains('portfolio__current'));

        currentImage.classList.remove('portfolio__current');
        currentImage.classList.add('portfolio__disabled');

//        condition if current is first?
        if(images.indexOf(currentImage) > 0 ) {
        currentImage.previousElementSibling.classList.remove('portfolio__disabled');
        currentImage.previousElementSibling.classList.add('portfolio__current');

//        circle moving to left
        circles[images.indexOf(currentImage)].removeAttribute('class', 'portfolio__circle_selected');
        circles[images.indexOf(currentImage) - 1].setAttribute('class', 'portfolio__circle_selected');

        } else {
            images[images.length - 1].classList.remove('portfolio__disabled');
            images[images.length - 1].classList.add('portfolio__current');

//        circle moving to end if current is first
        circles[0].removeAttribute('class', 'portfolio__circle_selected');
        circles[images.length - 1].setAttribute('class', 'portfolio__circle_selected');
        }
    }

//    disable current and enable next SPAN
    function leftArrowSpan() {

            //    looking for current SPAN
    let currentSpan = spanDesc.find(span => span.classList.contains('portfolio__current'));

        currentSpan.classList.remove('portfolio__current');
        currentSpan.classList.add('portfolio__disabled');

//        condition if current is first?
        if(spanDesc.indexOf(currentSpan) > 0 ){
        currentSpan.previousElementSibling.classList.remove('portfolio__disabled');
        currentSpan.previousElementSibling.classList.add('portfolio__current');
        } else {
            spanDesc[spanDesc.length - 1].classList.remove('portfolio__disabled');
            spanDesc[spanDesc.length - 1].classList.add('portfolio__current');
        }
    }

// MODALS

//array of close buttons
const closeModal = Array.from(document.querySelectorAll('.portfolio__modal_close'));

//array of 'what's been released?
const modalBtns = Array.from(document.querySelectorAll('.link__modal'));

//array of modals
const portfolioModals = Array.from(document.querySelectorAll('.portfolio__modal'));

//gray background
const modalsMain = document.querySelector('.modals');

//for each clicked span open modal that will be match with index of clicked what's been released?
modalBtns.forEach((modalBtn, index) => modalBtn.addEventListener('click', () => {
  modalsMain.style.display = 'flex';
  portfolioModals[index].style.display = 'block';
}))

//same with close
closeModal.forEach((close, index) => close.addEventListener('click', () => {
  modalsMain.style.display = 'none';
  portfolioModals[index].style.display = 'none';
}));

//close event when clicking background behind modal
window.addEventListener('click', closingModalOnBg);

function closingModalOnBg(e) {
  if(e.target.classList.contains('modals')) {
    modalsMain.style.display = 'none';
  }
}
