/* eslint-disable object-curly-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
/* eslint-disable no-use-before-define */
import { gsap } from 'gsap';
// Main PopUp
const popupBlackBg = document.querySelector('.popup-bg');
const popupMain = document.querySelector('.popup-main');
const addTravelBtn = document.querySelector('.add-travel-btn');
let isPopUpOpen = false;

// Main AddPic
const mainPic = document.querySelector('#main-pic-img');
const mainPicInput = document.querySelector('#main-pic-input');
let popUpClear = false;
// Timeline-PopUp
const openPopUp = gsap.timeline({ ease: 'power2.easeOut', paused: true, onReverseComplete: ClearPopUpCheck })
    .to(popupBlackBg, { duration: 0.25, opacity: 1, pointerEvents: 'auto' })
    .to(popupMain, { duration: 0.3, y: '0px', opacity: 1, pointerEvents: 'auto' }, -0.1);

// buttons
const xmark = document.querySelector('#popup-xmark-btn');
// Rest properties
const title = document.querySelector('#travel-title');
const travelStart = document.querySelector('#travel-start-date');
const travelEnd = document.querySelector('#travel-end-date');
const travelDetails = document.querySelector('#travel-description');

// PopUp
addTravelBtn.addEventListener('click', e => {
    OpenWindow();
});

popupBlackBg.addEventListener('click', e => {
    CloseWindow();
});

export function OpenWindow() {
    openPopUp.timeScale(1);
    openPopUp.play();
    isPopUpOpen = true;
}
export function CloseWindow(clear) {
    popUpClear = clear;
    openPopUp.timeScale(1.6);
    openPopUp.reverse();
    isPopUpOpen = false;
}

// AddPic
mainPicInput.addEventListener('change', function onChange() {
    const newPic = this.files[0];

    if (newPic) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            mainPic.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(newPic);
    }
});

// xMark buttons
xmark.addEventListener('click', (e) => {
    if (isPopUpOpen) {
        CloseWindow(true);
    }
});

function ClearPopUpCheck() {
    if (popUpClear) {
        title.value = null;
        mainPic.setAttribute('src', 'src/icons/photoSmall_icon.svg');
        travelStart.value = null;
        travelEnd.value = null;
        travelDetails.value = null;
        popUpClear = false;
    }
}
