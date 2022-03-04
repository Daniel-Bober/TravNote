/* eslint-disable no-shadow,func-names */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
import '../scss/main.scss';
import Tile from './tile';
import TileService from './tileService';
import PopUp from './popUp';

class App {
    constructor() {
        App.initListeners();
        TileService.initProperties();
        PopUp.initProperties();
        PopUp.initListeners();
    }

    static initListeners() {
        const mainList = document.querySelector('.list-container');
        const addBtn = document.querySelector('#popup-checkmark-btn');
        const editBg = document.querySelector('.main-list-edit-bg');

        const detailsStartDate = document.querySelector('#dtls-travel-start-date');
        const detailsEndDate = document.querySelector('#dtls-travel-end-date');
        const detailsDescription = document.querySelector('#travel-details-txt');
        window.onload = () => {
            if (localStorage.getItem('tilesArray') !== null) {
                TileService.tilesArray = JSON.parse(localStorage.getItem('tilesArray'));

                TileService.tilesArray.forEach((el: Tile) => {
                    TileService.generateTile(el);
                });
            }
        };

        addBtn.addEventListener('click', () => {
            const tile = new Tile();
            TileService.generateTile(tile);
            TileService.tilesArray.push(tile);
            PopUp.closeWindow(true);

            localStorage.setItem('tilesArray', JSON.stringify(TileService.tilesArray));
        });

        mainList.addEventListener('click', e => {
            const eTarget = e.target as HTMLElement;

            if (eTarget.classList.contains('el-edit-btn')) {
                TileService.setTargetObject(e.target);
                TileService.editModeOn(TileService.trObject);
            } else if (eTarget.classList.contains('el-delete-btn')) {
                TileService.removeTile(eTarget);
                TileService.reassignElementIndex();
            } else if (eTarget.classList.contains('el-title-div')) {
                TileService.setTargetObject(e.target);
                TileService.clickedTile(TileService.trObject);
            }

            if (eTarget.classList.contains('el-edit-pic-btn')) {
                TileService.trObject.elImgInput.addEventListener('change', function () {
                    const newPic = this.files[0];

                    if (newPic) {
                        const reader = new FileReader();
                        const elPic = TileService.trObject.elImg;

                        reader.addEventListener('load', () => {
                            elPic.setAttribute('src', reader.result.toString());
                        });
                        reader.readAsDataURL(newPic);
                    }
                }, { once: true });
            }
        });

        editBg.addEventListener('click', () => {
            TileService.editModeOff(TileService.trObject);

            TileService.reassignTileData(TileService.trObject);

            TileService.tilesArray[TileService.trObjectNr] = TileService.trObject;

            localStorage.setItem('tilesArray', JSON.stringify(TileService.tilesArray));
        });

        detailsStartDate.addEventListener('change', () => {
            TileService.saveDetails(TileService.trObject, 'startDate');
        });

        detailsEndDate.addEventListener('change', () => {
            TileService.saveDetails(TileService.trObject, 'endDate');
        });

        detailsDescription.addEventListener('change', () => {
            TileService.saveDetails(TileService.trObject, 'description');
        });
    }
}
// eslint-disable-next-line no-new
new App();
