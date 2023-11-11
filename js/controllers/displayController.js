import { gameController } from "./gameController.js";

export const displayController = (() => {
    const createHtmlGrid = () => {
        const gridContainer = document.querySelector('.grid__container');
        const grid = gameController.getGrid();
        gridContainer.innerHTML = ``;

        for (let i = 0; i < 11; ++i) {
            for (let j = 0; j < 11; ++j) {
                let newElem = document.createElement('img');
                newElem.classList.add('grid__elem');
                newElem.classList.add('gelem');
                newElem.setAttribute('src', `img/tiles/${grid.getGrid()[i][j].getType()}_tile.png`);
                newElem.setAttribute('alt', `base_tile.png`);
                newElem.setAttribute('data-row', `${grid.getGrid()[i][j].getRow()}`);
                newElem.setAttribute('data-col', `${grid.getGrid()[i][j].getCol()}`);
                gridContainer.append(newElem);
            }
        }
    }

    const setCurrElementHtml = () => {
        const currElem = gameController.getCurrElem();
        const currElemHtml = currElem.getCellsHtml();
        const s3gridContainer = document.querySelector('.s3grid__container');
        s3gridContainer.innerHTML = '';

        for (let i = 0; i < currElemHtml.length; i++) {
            s3gridContainer.innerHTML += currElemHtml[i];
        }
    }

    return { createHtmlGrid, setCurrElementHtml }
})();