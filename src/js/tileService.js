/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

export default class TileService {
    static tilesCount = 0;

    static tilesArray = [];

    static trObjectNr;

    static trObject;

    static generateTile(tile) {
        this.tilesCount++;

        if (tile.tile === undefined) {
            localStorage.setItem('tilesCount', this.tilesCount);
        }

        const mainList = document.querySelector('.list-container');
        const title = document.querySelector('#travel-title');
        const popupPic = document.querySelector('#main-pic-img');

        tile.mainBox = document.createElement('div');
        tile.mainBox.classList.add('main-list-box');
        mainList.appendChild(tile.mainBox);

        tile.mainEl = document.createElement('div');
        tile.mainEl.classList.add('main-list-element');
        tile.mainEl.setAttribute('data-id', this.tilesCount);
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
            tile.elImg.src = popupPic.src;
            tile.image = popupPic.src;
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
            tile.elTitle.value = title.value;
            tile.title = title.value;
        } else {
            tile.elTitle.value = tile.title;
        }
        tile.titleDiv.appendChild(tile.elTitle);
    }

    static removeTile(clicked) {
        const editBg = document.querySelector('.main-list-edit-bg');
        editBg.classList.remove('editActive');

        this.tilesArray.splice(this.trObjectNr, 1);
        clicked.closest('.main-list-box').remove();

        localStorage.setItem('tilesArray', JSON.stringify(this.tilesArray));
    }

    static editModeOn(tile) {
        const editBg = document.querySelector('.main-list-edit-bg');
        editBg.classList.add('editActive');

        tile.mainEl.classList.add('editActive');
        tile.editBtn.classList.add('editActive');
        tile.deleteBtn.classList.add('editActive');
        tile.elEditPicBtn.classList.add('editActive');
        tile.elTitle.removeAttribute('readonly');
    }

    static editModeOff(tile) {
        const editBg = document.querySelector('.main-list-edit-bg');
        editBg.classList.remove('editActive');

        tile.mainEl.classList.remove('editActive');
        tile.editBtn.classList.remove('editActive');
        tile.deleteBtn.classList.remove('editActive');
        tile.elEditPicBtn.classList.remove('editActive');
        tile.elTitle.setAttribute('readonly', 'readonly');
    }

    static reasignID(obj, nr) {
        obj.mainEl.removeAttribute('data-id');
        obj.mainEl.setAttribute('data-id', nr);
    }

    static reassignElementIndex() {
        let index = 1;
        this.tilesCount = 0;

        this.tilesArray.forEach(el => {
            this.reasignID(el, index);
            index++;
            this.tilesCount++;
        });

        localStorage.setItem('tilesCount', this.tilesCount);
    }

    static setTargetObject(clicked) {
        const closestList = clicked.closest('.main-list-element');
        const nr = closestList.dataset.id;
        this.trObjectNr = +nr - 1;
        this.trObject = this.tilesArray[this.trObjectNr];
    }
}
