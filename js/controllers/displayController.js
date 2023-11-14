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
                    timeAndSeason.getCurrSeason() === 3 ? "Autumn (C, D)" :
                        timeAndSeason.getCurrSeason() === 4 ? "Winter (D, A)" :
                            "End";
    }

    const updatePointsHtml = () => {
        const cardsPoints = document.querySelectorAll('.card__points');
        const counterPoints = document.querySelector('.counter__points');
        const pointsManager = gameController.getPointsManager();
        const seasonalPoints = pointsManager.getSeasonalPoints();

        for (let i = 0; i < cardsPoints.length; i++) {
            cardsPoints[i].innerHTML = `${seasonalPoints[i]}`
        }

        counterPoints.innerHTML = `${pointsManager.getPointsTotal()}`;
    }

    const initializeMissionsHtml = () => {
        const section2MissionsHtml = document.querySelector('.section2__missions');
        const missionsManager = gameController.getMissionsManager();
        const activeMissions = missionsManager.getActiveMissions();
        section2MissionsHtml.innerHTML = ``;

        for (let i = 0; i < activeMissions.length; i++) {
            let newElem = document.createElement('div');
            newElem.classList.add('missions__mission');
            newElem.classList.add(`missions__mission${i + 1}`);
            let imgName = activeMissions[i].getTitle().toLowerCase().split(' ').join('_');
            newElem.innerHTML = `
                <div class="mission__mleft">
                    <img src="img/missions_pics/${imgName}_mission.png"
                        class="mission__pic mission${i}__pic" alt="mission${i}_pic">
                </div>

                <div class="mission__mright">
                    <div class="mright__top">
                        <h4 class="mright__title mission${i}__title">${activeMissions[i].getTitle()}</h4>
                        <p class="mright__description mission${i}__description">
                            ${activeMissions[i].getDescription()}
                        </p>
                    </div>

                    <div class="mright__mrbottom">
                        <div class="mrbottom__left">
                            <p class="mrbottom__points mission${i}__points">(${activeMissions[i].getCurrPoints() +
                (activeMissions[i].getCurrPoints() === 1 ? " point" : " points")})</p>
                        </div>

                        <div class="mrbottom__right">
                            <div class="mrbottom__status mission${i}__status"></div>
                            <h4 class="mrbottom__letter mission${i}__letter">${activeMissions[i].getSeasonalLetter()}</h4>
                        </div>
                    </div>
                </div>
            `
            section2MissionsHtml.append(newElem);
        }
    }

    const updateMissionsHtml = () => {
        const mrbottomStatusHtml = document.querySelectorAll('.mrbottom__status');
        const mrbottomPointsHtml = document.querySelectorAll('.mrbottom__points');
        const missionsManager = gameController.getMissionsManager();
        const activeMissions = missionsManager.getActiveMissions();
        const currSeasonLetters = missionsManager.getCurrentSeasonLetters();

        for (let i = 0; i < activeMissions.length; i++) {
            if (
                activeMissions[i].getSeasonalLetter() === currSeasonLetters[0] ||
                activeMissions[i].getSeasonalLetter() === currSeasonLetters[1]
            ) {
                mrbottomStatusHtml[i].style.cssText = `display: block;`;
            }
            else {
                mrbottomStatusHtml[i].style.cssText = `display: none;`;
            }

            mrbottomPointsHtml[i].innerHTML = `(${activeMissions[i].getCurrPoints() +
                (activeMissions[i].getCurrPoints() === 1 ? " point" : " points")})`
        }
    }

    const showGameEndScreen = () => {
        const endgamewind = document.querySelector('.endgamewind');
        const egtext2Score = document.querySelector('.egtext2__score');
        const cover = document.querySelector('.cover');
        const pointsManager = gameController.getPointsManager();

        egtext2Score.innerHTML = `${pointsManager.getPointsTotal()}`;
        endgamewind.classList.add('endgamewind-active');
        cover.style.cssText = `background-color: rgba(0, 0, 0, 0.5); z-index: 6;`;
    }

    const updateHtml = () => {
        updateHtmlGrid();
        updateCurrElementHtml();
        updateTimeHtml();
        updatePointsHtml();
        updateMissionsHtml();
    }

    const addEventListeners = () => {
        const rotateButton = document.querySelector('.section3__button1');
        const flipButton = document.querySelector('.section3__button2');
        let currElem = gameController.getCurrElem();
        const gridContainer = document.querySelector('.grid__container');
        const grid = gameController.getGrid();
        const timeAndSeason = gameController.getTimeAndSeason();
        const missionsManager = gameController.getMissionsManager();
        const endgamewindEgbutton1 = document.querySelector('.endgamewind__egbutton1');

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
                if (timeAndSeason.getCurrTime() + currElem.getTime() >= 7) {
                    gameController.updateAllPoints();
                    missionsManager.updateCurrentSeasonLetters();
                }
                gameController.calcSeasonalMissionsPoints();
                gameController.updateCurrTime();
                gameController.updateCurrElementToNext();
                missionsManager.updateCurrentSeasonLetters();
                updateHtml();
                if (timeAndSeason.getGameEnd()) {
                    showGameEndScreen();
                }
            }
        });

        endgamewindEgbutton1.addEventListener('click', (e) => {
            location.reload();
        });
    }

    return { addEventListeners, initializeMissionsHtml, updateHtml }
})();