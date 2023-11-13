import { GridClass } from "../grid/grid.js";
import { Element } from "../element/element.js";
import { elements } from "../data/elements.js";
import { displayController } from "./displayController.js";
import { TimeManager } from "../time and points/timeManager.js";
import { MissionsManager } from "../missions/missionsManager.js";
// import { PointsManager } from "../time and points/pointsManager.js";


export const gameController = (() => {
    let currElem;
    let index = 0;
    const grid = new GridClass();
    const timeAndSeason = new TimeManager();
    const missionsManager = new MissionsManager();
    // const points = new PointsManager();


    const getCurrElem = () => {
        return currElem;
    }

    const getGrid = () => {
        return grid;
    }

    const getTimeAndSeason = () => {
        return timeAndSeason;
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

    const calculateMissionsPoints = () => {
        missionsManager.calculatePointsFromActiveMissions();
        console.log(missionsManager.getTotalPointsFromMissions());
    }

    // const updateCurrPoints = () => {
    //     points.addCurrSeasonPoints()
    // }

    const startGame = () => {
        randomizeArray(elements);
        updateCurrElementToNext();
        missionsManager.updateActiveMissions();
        getMissionsPoints();
        displayController.updateHtml();
        displayController.addEventListeners();
    }

    return {
        getCurrElem, getGrid, getTimeAndSeason,
        randomizeArray, updateCurrElementToNext, updateCurrTime,
        startGame
    }
})();