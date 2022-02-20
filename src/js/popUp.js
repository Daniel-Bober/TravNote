/* eslint-disable object-curly-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
/* eslint-disable no-use-before-define */
import { gsap } from 'gsap';

export default class PopUp {
    static popupBlackBg;

    static mainPic;

    static mainPicInput;

    static addTravelBtn;

    static popupMain;

    static xmark;

    static title;

    static travelStart;

    static travelEnd;

    static travelDetails = document.querySelector('#travel-description');

    openPopUp = gsap.timeline({ ease: 'power2.easeOut', paused: true, onReverseComplete: this.ClearPopUpCheck })
        .to(this.popupBlackBg, { duration: 0.25, opacity: 1, pointerEvents: 'auto' })
        .to(this.popupMain, { duration: 0.3, y: '0px', opacity: 1, pointerEvents: 'auto' }, -0.1);

    static popUpClear = false;

    constructor() {
        this.listenersInit();
    }

    listenersInit() {
        this.addTravelBtn.addEventListener('click', e => {
            this.OpenWindow();
        });

        this.popupBlackBg.addEventListener('click', e => {
            this.CloseWindow();
        });

        this.mainPicInput.addEventListener('change', function onChange() {
            const newPic = this.files[0];

            if (newPic) {
                const reader = new FileReader();

                reader.addEventListener('load', () => {
                    this.mainPic.setAttribute('src', reader.result);
                });
                reader.readAsDataURL(newPic);
            }
        });

        this.xmark.addEventListener('click', e => {
            this.CloseWindow(true);
        });
    }

    ClearPopUpCheck() {
        if (this.popUpClear) {
            this.title.value = null;
            this.mainPic.setAttribute('src', 'src/icons/photoSmall_icon.svg');
            this.travelStart.value = null;
            this.travelEnd.value = null;
            this.travelDetails.value = null;
            this.popUpClear = false;
        }
    }

    OpenWindow() {
        this.openPopUp.timeScale(1);
        this.openPopUp.play();
    }

    CloseWindow(clear) {
        this.popUpClear = clear;
        this.openPopUp.timeScale(1.6);
        this.openPopUp.reverse();
    }

    static initProperties() {
        this.popupBlackBg = document.querySelector('.popup-bg');
        this.mainPic = document.querySelector('#main-pic-img');
        this.mainPicInput = document.querySelector('#main-pic-input');
        this.addTravelBtn = document.querySelector('.add-travel-btn');
        this.popupMain = document.querySelector('.popup-main');
        this.xmark = document.querySelector('#popup-xmark-btn');
        this.title = document.querySelector('#travel-title');
        this.travelStart = document.querySelector('#travel-start-date');
        this.travelEnd = document.querySelector('#travel-end-date');
        this.travelDetails = document.querySelector('#travel-description');
    }
}
