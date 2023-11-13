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
                newElem.classList.add(`row-${grid.getGrid()[i][j].getRow()}`);
                newElem.classList.add(`col-${grid.getGrid()[i][j].getCol()}`);
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

    const showElementOnGrid = (target) => {
        const row = parseInt(target.getAttribute('data-row'));
        const col = parseInt(target.getAttribute('data-col') - 1);
        const currElem = gameController.getCurrElem();
        const currElemShape = currElem.getShape();
        const grid = gameController.getGrid();


        for (let i = 0; i < currElemShape.length; i++) {
            for (let j = 0; j < currElemShape[i].length; j++) {
                let htmlGridElem = document.querySelector(`.row-${row + i}.col-${col + j}`);
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
                let htmlGridElem = document.querySelector(`.row-${row + i}.col-${col + j}`);
                if (htmlGridElem) {
                    htmlGridElem.src = `img/tiles/${grid.getGrid()[row + i][col + j].getType()}_tile.png`;
                    htmlGridElem.style.opacity = 1;
                }
            }
        }
    }

    const updateTimeHtml = () => {
        const currElem = gameController.getCurrElem();
        const elemTimeValueHtml = document.querySelector('.time__value');
        const timeinfoTimeHtml = document.querySelector('.timeinfo__time');
        const seasoninfoSeasonHtml = document.querySelector('.seasoninfo__season');
        const timeAndSeason = gameController.getTimeAndSeason();

        elemTimeValueHtml.innerHTML = `${currElem.getTime()}`;
        timeinfoTimeHtml.innerHTML = timeAndSeason.getCurrTime();

        seasoninfoSeasonHtml.innerHTML =
            timeAndSeason.getCurrSeason() === 1 ? "Spring (A, B)" :
                timeAndSeason.getCurrSeason() === 2 ? "Summer (B, C)" :
                    timeAndSeason.getCurrSeason() === 3 ? "Autumn (C D)" :
                        timeAndSeason.getCurrSeason() === 4 ? "Winter (D, A)" :
                            "End";
    }

    const updateHtml = () => {
        updateHtmlGrid();
        updateCurrElementHtml();
        updateTimeHtml();
    }

    const addEventListeners = () => {
        const rotateButton = document.querySelector('.section3__button1');
        const flipButton = document.querySelector('.section3__button2');
        let currElem = gameController.getCurrElem();
        const gridContainer = document.querySelector('.grid__container');
        const grid = gameController.getGrid();

        rotateButton.addEventListener('click', () => {
            currElem = gameController.getCurrElem();
            currElem.rotate();
            updateCurrElementHtml();
        });

        flipButton.addEventListener('click', () => {
            currElem = gameController.getCurrElem();
            currElem.flip();
            updateCurrElementHtml();
        });

        gridContainer.addEventListener('mousemove', (e) => {
            showElementOnGrid(e.target);
        });

        gridContainer.addEventListener('mouseout', (e) => {
            hideElementFromGrid(e.target);
        });

        gridContainer.addEventListener('click', (e) => {
            if (grid.addElementToGrid(e.target)) {
                gameController.updateCurrTime();
                gameController.updateCurrElementToNext();
                gameController.getMissionsPoints();
                updateHtml();
            }
        });
    }

    return { addEventListeners, updateHtml }
})();