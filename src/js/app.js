/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
import '../scss/main.scss';
import Storage from './Storage';
import Tile from './tile';
import TileService from './tileService';

class App {
    constructor() {
        App.listenersInit();
    }

    static listenersInit() {
        const mainList = document.querySelector('.list-container');
        const addBtn = document.querySelector('#popup-checkmark-btn');
        const editBg = document.querySelector('.main-list-edit-bg');

        window.onload = e => {
            // localStorage.clear();
            if (localStorage.getItem('tilesArray') !== null) {
                TileService.tilesArray = JSON.parse(localStorage.getItem('tilesArray'));

                TileService.tilesArray.forEach(el => {
                    TileService.generateTile(el);
                });
            }
        };

        addBtn.addEventListener('click', e => {
            const tile = new Tile();
            TileService.generateTile(tile);
            TileService.tilesArray.push(tile);

            localStorage.setItem('tilesArray', JSON.stringify(TileService.tilesArray));
        });

        mainList.addEventListener('click', e => {
            if (e.target.classList.contains('el-edit-btn')) {
                TileService.setTargetObject(e.target);
                TileService.editModeOn(TileService.trObject);
            } else if (e.target.classList.contains('el-delete-btn')) {
                TileService.removeTile(e.target);
                TileService.reassignElementIndex();
            }

            if (e.target.classList.contains('el-edit-pic-btn')) {
                TileService.trObject.elImgInput.addEventListener('change', function () {
                    const newPic = this.files[0];

                    // Storage.uploadFile(newPic, 'Images');
                    console.log('change');
                    if (newPic) {
                        const reader = new FileReader();
                        const elPic = TileService.trObject.elImg;

                        // reader.onload = e => {
                        //     elPic.setAttribute('src', e.target.result);
                        // };

                        reader.addEventListener('load', () => {
                            elPic.setAttribute('src', reader.result);
                            // reader.removeEventListener('load', ReaderLoad);
                        });
                        reader.readAsDataURL(newPic);
                    }

                    // TileService.trObject.elImgInput.removeEventListener('change', setPic);
                });
            }
        });

        editBg.addEventListener('click', e => {
            TileService.editModeOff(TileService.trObject);

            TileService.tilesArray[TileService.trObjectNr] = TileService.trObject;

            localStorage.setItem('tilesArray', JSON.stringify(TileService.tilesArray));
        });
    }
}

const app = new App();
