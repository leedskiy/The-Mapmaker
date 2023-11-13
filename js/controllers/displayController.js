import { gameController } from "./gameController.js";

export const displayController = (() => {
    const updateHtmlGrid = () => {
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
                newElem.setAttribute('id', `gridElem${grid.getGrid()[i][j].getRow()}`
                    + `${grid.getGrid()[i][j].getCol()}`);
                gridContainer.append(newElem);
            }
        }
    }

    const updateCurrElementHtml = () => {
        const currElem = gameController.getCurrElem();
        const currElemHtml = currElem.getCellsHtml();
        const s3gridContainer = document.querySelector('.s3grid__container');
        s3gridContainer.innerHTML = '';

        for (let i = 0; i < currElemHtml.length; i++) {
            s3gridContainer.innerHTML += currElemHtml[i];
        }
    }

    const showElementOnGrid = (event) => {
        const target = event.target;
        const row = parseInt(target.getAttribute('data-row'));
        const col = parseInt(target.getAttribute('data-col')) - 1;
        const currElem = gameController.getCurrElem();
        const currElemShape = currElem.getShape();
        const grid = gameController.getGrid();

        for (let i = 0; i < currElemShape.length; i++) {
            for (let j = 0; j < currElemShape[i].length; j++) {
                let htmlGridElem = document.getElementById(`gridElem${row + i}${col + j}`);
                if (htmlGridElem) {
                    if (currElemShape[i][j]) {
                        if (grid.getGrid()[row + i][col + j].getType() === "base") {
                            htmlGridElem.src = `img/tiles/${currElem.getType()}_tile.png`;
                            htmlGridElem.style.opacity = 0.5;
                        }
                        else {
                            htmlGridElem.src = `img/tiles/error_tile.png`;
                            htmlGridElem.style.opacity = 0.8;
                        }
                    }
                }
            }
        }
    }

    const hideElementFromGrid = (target) => {
        const row = parseInt(target.getAttribute('data-row'));
        const col = parseInt(target.getAttribute('data-col')) - 1;
        const currElem = gameController.getCurrElem();
        const currElemShape = currElem.getShape();
        const grid = gameController.getGrid();

        for (let i = 0; i < currElemShape.length; i++) {
            for (let j = 0; j < currElemShape[i].length; j++) {
                let htmlGridElem = document.getElementById(`gridElem${row + i}${col + j}`);
                if (htmlGridElem) {
                    htmlGridElem.src = `img/tiles/${grid.getGrid()[row + i][col + j].getType()}_tile.png`;
                    htmlGridElem.style.opacity = 1;
                }
            }
        }
    }

    const addEventListeners = () => {
        const rotateButton = document.querySelector('.section3__button1');
        const flipButton = document.querySelector('.section3__button2');
        const currElem = gameController.getCurrElem();
        const gridContainer = document.querySelector('.grid__container');

        rotateButton.addEventListener('click', () => {
            currElem.rotate();
            updateCurrElementHtml();
        });

        flipButton.addEventListener('click', () => {
            currElem.flip();
            updateCurrElementHtml();
        });

        gridContainer.addEventListener('mousemove', (e) => {
            showElementOnGrid(e);
        });

        gridContainer.addEventListener('mouseout', (e) => {
            hideElementFromGrid(e.target);
        });
    }

    return { updateHtmlGrid, updateCurrElementHtml, addEventListeners }
})();