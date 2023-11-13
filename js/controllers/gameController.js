import { GridClass } from "../grid/grid.js";
import { Element } from "../element/element.js";
import { elements } from "../data/elements.js";
import { displayController } from "./displayController.js";

export const gameController = (() => {
    let currElem;
    let index = 0;
    let grid = new GridClass();

    const getCurrElem = () => {
        return currElem;
    }

    const getGrid = () => {
        return grid;
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
            console.log(16);
            index = 0;
            randomizeArray(elements);
        }

        currElem = new Element(elements[index].time, elements[index].type, elements[index].shape,
            elements[index].rotation, elements[index].mirrored);

        ++index;
    }

    const startGame = () => {
        randomizeArray(elements);
        updateCurrElementToNext();
        displayController.updateHtmlGrid();
        displayController.updateCurrElementHtml();
        displayController.addEventListeners();
    }

    return { getCurrElem, getGrid, updateCurrElementToNext, startGame }
})();

