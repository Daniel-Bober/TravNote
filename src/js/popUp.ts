/* eslint-disable object-curly-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
/* eslint-disable no-use-before-define */
import { gsap } from 'gsap';

export default class PopUp {
    static popupBlackBg: HTMLDivElement;

    static mainPic: HTMLImageElement;

    static mainPicInput: HTMLInputElement;

    static addTravelBtn: HTMLButtonElement;

    static popupMain: HTMLDivElement;

    static xmark: HTMLButtonElement;

    static title: HTMLInputElement;

    static travelStart: HTMLInputElement;

    static travelEnd: HTMLInputElement;

    static travelDetails: HTMLTextAreaElement;

    static openPopUp: GSAPTimeline;

    static popUpClear = false;

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

        this.openPopUp = gsap.timeline({ ease: 'power2.easeOut', paused: true, onReverseComplete: PopUp.clearPopUpCheck })
            .to(this.popupBlackBg, { duration: 0.25, opacity: 1, pointerEvents: 'auto' })
            .to(this.popupMain, { duration: 0.3, y: '0px', opacity: 1, pointerEvents: 'auto' }, -0.1);
    }

    static initListeners() {
        this.addTravelBtn.addEventListener('click', () => {
            PopUp.openWindow();
        });

        this.popupBlackBg.addEventListener('click', () => {
            PopUp.closeWindow();
        });

        this.mainPicInput.addEventListener('change', function onChange() {
            const newPic = this.files[0];

            if (newPic) {
                const reader = new FileReader();

                reader.addEventListener('load', () => {
                    PopUp.mainPic.setAttribute('src', reader.result.toString());
                });
                reader.readAsDataURL(newPic);
            }
        });

        this.xmark.addEventListener('click', () => {
            PopUp.closeWindow(true);
        });
    }

    static clearPopUpCheck() {
        if (PopUp.popUpClear) {
            PopUp.title.value = null;
            PopUp.mainPic.setAttribute('src', 'src/icons/photoSmall_icon.svg');
            PopUp.travelStart.value = null;
            PopUp.travelEnd.value = null;
            PopUp.travelDetails.value = null;
            PopUp.popUpClear = false;
        }
    }

    static openWindow() {
        this.openPopUp.timeScale(1);
        this.openPopUp.play();
    }

    static closeWindow(clear: boolean = undefined) {
        this.popUpClear = clear;
        this.openPopUp.timeScale(1.6);
        this.openPopUp.reverse();
    }
}
