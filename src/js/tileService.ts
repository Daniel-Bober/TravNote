/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

import Tile from './tile';

export default class TileService {
    static mainList: HTMLDivElement;

    static title: HTMLInputElement;

    static startDate: HTMLInputElement;

    static endDate: HTMLInputElement;

    static description: HTMLTextAreaElement;

    static popupPic: HTMLImageElement;

    static detailsTitle: HTMLHeadingElement;

    static detailsStartDate: HTMLInputElement;

    static detailsEndDate: HTMLInputElement;

    static detailsDescription: HTMLTextAreaElement;

    static tilesCount = 0;

    static tilesArray: Tile[] = [];

    static trObjectNr: number;

    static trObject: Tile;

    static initProperties() {
        this.mainList = document.querySelector('.list-container');

        this.title = document.querySelector('#travel-title');
        this.startDate = document.querySelector('#travel-start-date');
        this.endDate = document.querySelector('#travel-end-date');
        this.description = document.querySelector('#travel-description');

        this.detailsTitle = document.querySelector('#dtls-title');
        this.detailsStartDate = document.querySelector('#dtls-travel-start-date');
        this.detailsEndDate = document.querySelector('#dtls-travel-end-date');
        this.detailsDescription = document.querySelector('#travel-details-txt');
        this.popupPic = document.querySelector('#main-pic-img');
    }

    static generateTile(tile: Tile) {
        this.tilesCount++;

        if (tile.title === undefined) {
            localStorage.setItem('tilesCount', this.tilesCount.toString());
        }

        tile.mainBox = document.createElement('div');
        tile.mainBox.classList.add('main-list-box');
        this.mainList.appendChild(tile.mainBox);

        tile.mainEl = document.createElement('div');
        tile.mainEl.classList.add('main-list-element');
        tile.mainEl.setAttribute('data-id', this.tilesCount.toString());
        tile.mainBox.appendChild(tile.mainEl);

        tile.editBtn = document.createElement('img');
        tile.editBtn.src = 'src/icons/pencil_icon.svg';
        tile.editBtn.classList.add('el-edit-btn');
        tile.mainEl.appendChild(tile.editBtn);

        tile.deleteBtn = document.createElement('img');
        tile.deleteBtn.src = 'src/icons/bin_icon.svg';
        tile.deleteBtn.classList.add('el-delete-btn');
        tile.mainEl.appendChild(tile.deleteBtn);

        tile.picDiv = document.createElement('div');
        tile.picDiv.classList.add('el-pic-div');
        tile.mainEl.appendChild(tile.picDiv);

        tile.elImg = document.createElement('img');
        if (tile.image === undefined) {
            tile.elImg.src = this.popupPic.src;
            tile.image = this.popupPic.src;
        } else {
            tile.elImg.src = tile.image;
        }
        tile.elImg.setAttribute('id', 'el-pic-img');
        tile.picDiv.appendChild(tile.elImg);

        tile.elImgInput = document.createElement('input');
        tile.elImgInput.type = 'file';
        tile.elImgInput.setAttribute('id', 'el-pic-input');
        tile.picDiv.appendChild(tile.elImgInput);

        tile.elEditPicBtn = document.createElement('label');
        tile.elEditPicBtn.setAttribute('for', 'el-pic-input');
        tile.elEditPicBtn.classList.add('el-edit-pic-btn');
        tile.picDiv.appendChild(tile.elEditPicBtn);

        tile.elEditPicImg = document.createElement('img');
        tile.elEditPicImg.src = 'src/icons/editPic_icon.svg';
        tile.elEditPicBtn.appendChild(tile.elEditPicImg);

        tile.titleDiv = document.createElement('div');
        tile.titleDiv.classList.add('el-title-div');
        tile.mainEl.appendChild(tile.titleDiv);

        tile.elTitle = document.createElement('input');
        tile.elTitle.type = 'text';
        tile.elTitle.setAttribute('id', 'el-title');
        tile.elTitle.setAttribute('readonly', 'readonly');
        if (tile.title === undefined) {
            tile.elTitle.value = this.title.value;
            tile.title = this.title.value;
        } else {
            tile.elTitle.value = tile.title;
        }
        tile.titleDiv.appendChild(tile.elTitle);

        tile.startDate = this.startDate.value;
        tile.endDate = this.endDate.value;
        console.log(this.endDate.value);
        tile.description = this.description.value;
    }

    static removeTile(clicked: HTMLElement) {
        const editBg = document.querySelector('.main-list-edit-bg');
        editBg.classList.remove('editActive');

        this.tilesArray.splice(this.trObjectNr, 1);
        clicked.closest('.main-list-box').remove();

        localStorage.setItem('tilesArray', JSON.stringify(this.tilesArray));
    }

    static editModeOn(tile: Tile) {
        const editBg = document.querySelector('.main-list-edit-bg');
        editBg.classList.add('editActive');

        tile.mainEl.classList.add('editActive');
        tile.editBtn.classList.add('editActive');
        tile.deleteBtn.classList.add('editActive');
        tile.elEditPicBtn.classList.add('editActive');
        tile.titleDiv.classList.add('editActive');
        tile.elTitle.removeAttribute('readonly');
    }

    static editModeOff(tile: Tile) {
        const editBg = document.querySelector('.main-list-edit-bg');
        editBg.classList.remove('editActive');

        tile.mainEl.classList.remove('editActive');
        tile.editBtn.classList.remove('editActive');
        tile.deleteBtn.classList.remove('editActive');
        tile.elEditPicBtn.classList.remove('editActive');
        tile.titleDiv.classList.remove('editActive');
        tile.elTitle.setAttribute('readonly', 'readonly');
    }

    static reassignTileData(tile: Tile) {
        tile.title = tile.elTitle.value;
        tile.image = tile.elImg.src;
    }

    static reassignID(obj: Tile, nr: number) {
        obj.mainEl.removeAttribute('data-id');
        obj.mainEl.setAttribute('data-id', nr.toString());
    }

    static reassignElementIndex() {
        let index = 1;
        this.tilesCount = 0;
        this.tilesArray.forEach((el: Tile) => {
            this.reassignID(el, index);
            index++;
            this.tilesCount++;
        });

        localStorage.setItem('tilesCount', this.tilesCount.toString());
    }

    static setTargetObject(clicked: any) {
        const closestList = clicked.closest('.main-list-element');
        const nr = closestList.dataset.id;
        this.trObjectNr = +nr - 1;
        this.trObject = this.tilesArray[this.trObjectNr];
    }

    static clickedTile(tile: Tile) {
        TileService.detailsTitle.innerHTML = tile.title;
        TileService.detailsStartDate.value = tile.startDate;
        TileService.detailsEndDate.value = tile.endDate;
        TileService.detailsDescription.value = tile.description;
    }
}
