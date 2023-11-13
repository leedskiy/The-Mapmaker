import { GridClass } from "../grid/grid.js";
import { Element } from "../element/element.js";
import { elements } from "../data/elements.js";
import { displayController } from "./displayController.js";
import { TimeManager } from "../time and points/timeManager.js";
import { MissionsManager } from "../missions/missionsManager.js";
import { PointsManager } from "../time and points/pointsManager.js";

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

    const calcActMissionsPoints = () => {
        missionsManager.calcPtsFromActMissions();
        return missionsManager.getTtlPtsFromActMissions();
    }

    const calcSurrMountMissionPoints = () => {
        missionsManager.calcSurrMountMissionPts();
        return missionsManager.getSurrMountainMissionPoints();
    }

    const updateCurrPoints = () => {
        const points = calcActMissionsPoints() + calcSurrMountMissionPoints();
        pointsManager.setCurrSeasonPoints(points);
        pointsManager.calculatePointsTotal();
    }

    const startGame = () => {
        randomizeArray(elements);
        updateCurrElementToNext();
        missionsManager.updateActiveMissions();
        updateCurrPoints();
        displayController.initializeMissionsHtml();
        displayController.updateHtml();
        displayController.addEventListeners();
    }

    return {
        getCurrElem, getGrid, getTimeAndSeason, getMissionsManager, getPointsManager,
        randomizeArray, updateCurrElementToNext, updateCurrTime, updateCurrPoints,
        startGame
    }
})();