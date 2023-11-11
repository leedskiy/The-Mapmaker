import { GridClass } from "../grid/grid.js";
import { Element } from "../element/element.js";
import { elements } from "../data/elements.js";
import { displayController } from "./displayController.js";

export const gameController = (() => {
    let currElem = new Element(elements[0].time, elements[0].type, elements[0].shape,
        elements[0].rotation, elements[0].mirrored);
    let grid = new GridClass();

    const getCurrElem = () => {
        return currElem;
    }

    const getGrid = () => {
        return grid;
    }

    const startGame = () => {
        displayController.createHtmlGrid();
        displayController.setCurrElementHtml();
    }

    return { getCurrElem, getGrid, startGame }
})();

