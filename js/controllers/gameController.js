import { GridClass } from "../grid/grid.js";
import { Element } from "../element/element.js";
import { elements } from "../data/elements.js";
import { displayController } from "./displayController.js";
import { TimeManager } from "../time and points/timeManager.js";

export const gameController = (() => {
    let currElem;
    let index = 0;
    let grid = new GridClass();
    let timeAndSeason = new TimeManager();

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
        console.log(currElem.getTime());
        timeAndSeason.adjustCurrTime(currElem.getTime());
    }

    const startGame = () => {
        randomizeArray(elements);
        updateCurrElementToNext();
        displayController.updateHtml();
        displayController.addEventListeners();
    }

    return { getCurrElem, getGrid, getTimeAndSeason, updateCurrElementToNext, updateCurrTime, startGame }
})();

