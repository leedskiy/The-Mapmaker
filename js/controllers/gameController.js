import { GridClass } from "../grid/grid.js";
import { Element } from "../element/element.js";
import { elements } from "../data/elementsData.js";
import { displayController } from "./displayController.js";
import { TimeManager } from "../managers/timeManager.js";
import { MissionsManager } from "../managers/missionsManager.js";
import { PointsManager } from "../managers/pointsManager.js";

export const gameController = (() => {
    let currElem;
    let index = 0;
    const grid = new GridClass();
    const timeAndSeason = new TimeManager();
    const missionsManager = new MissionsManager();
    const pointsManager = new PointsManager();

    const getCurrElem = () => {
        return currElem;
    }

    const getGrid = () => {
        return grid;
    }

    const getTimeAndSeason = () => {
        return timeAndSeason;
    }

    const getMissionsManager = () => {
        return missionsManager;
    }

    const getPointsManager = () => {
        return pointsManager;
    }

    const randomizeArray = (array) => {
        for (let i = 0; i < array.length - 1; ++i) {
            let rand = Math.floor(Math.random() * array.length);
            let tempElem = array[i];
            array[i] = array[rand];
            array[rand] = tempElem;
        }
    }

    const updateCurrElementToNext = () => {
        if (index === 16) {
            index = 0;
            randomizeArray(elements);
        }

        currElem = new Element(elements[index].time, elements[index].type, elements[index].shape,
            elements[index].rotation, elements[index].mirrored);

        ++index;
    }

    const updateCurrTime = () => {
        timeAndSeason.adjustCurrTime(currElem.getTime());
    }

    const calcSeasonalMissionsPoints = () => {
        missionsManager.calcPtsFromSeasonalMissions();
        return missionsManager.getPtsFromSeasonalMissions();
    }

    const calcSurrMountMissionPoints = () => {
        missionsManager.calcSurrMountMissionPts();
        return missionsManager.getSurrMountainMissionPoints();
    }

    const updateAllPoints = () => {
        const points = calcSeasonalMissionsPoints() + calcSurrMountMissionPoints();
        pointsManager.setCurrSeasonPoints(points);
        pointsManager.calculatePointsTotal();
    }

    const startGame = () => {
        randomizeArray(elements);
        updateCurrElementToNext();
        missionsManager.updateActiveMissions();
        missionsManager.updateCurrentSeasonLetters();
        updateAllPoints();
        displayController.initializeMissionsHtml();
        displayController.updateHtml();
        displayController.addEventListeners();
    }

    return {
        getCurrElem, getGrid, getTimeAndSeason, getMissionsManager, getPointsManager,
        calcSeasonalMissionsPoints, randomizeArray,
        updateCurrElementToNext, updateCurrTime, updateAllPoints,
        startGame
    }
})();