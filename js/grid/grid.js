import { GridCell } from "./gridCell.js";
import { mountains } from "../data/mountains.js";
import { gameController } from "../controllers/gameController.js";

export class GridClass {
    #grid;

    constructor() {
        this.#grid = [];
        this.initializeGrid();
    }

    initializeGrid = () => {
        for (let i = 0; i < 11; i++) {
            let row = [];

            for (let j = 0; j < 11; j++) {
                let cell = new GridCell(i, j, "base");
                row.push(cell);
            }

            this.#grid.push(row);
        }

        for (let i = 0; i < mountains.length; i++) {
            this.#grid[mountains[i][0] - 1][mountains[i][1] - 1].setType("mountain");
        }
    }

    getGrid = () => {
        return this.#grid;
    }

    addElementToGrid = (target) => {
        const row = parseInt(target.getAttribute('data-row'));
        const col = parseInt(target.getAttribute('data-col')) - 1;
        const currElem = gameController.getCurrElem();
        const currElemShape = currElem.getShape();

        if (this.checkElemCanBePlaced(row, col)) {
            for (let i = 0; i < currElemShape.length; i++) {
                for (let j = 0; j < currElemShape[i].length; j++) {
                    if (this.#grid[row + i][col + j]) {
                        if (currElemShape[i][j]) {
                            this.#grid[row + i][col + j].setType(currElem.getType());
                        }
                    }
                }
            }
            return true;
        }
        else {
            return false;
        }
    }

    checkElemCanBePlaced = (row, col) => {
        const currElem = gameController.getCurrElem();
        const currElemShape = currElem.getShape();

        for (let i = 0; i < currElemShape.length; i++) {
            for (let j = 0; j < currElemShape[i].length; j++) {
                if (this.#grid[row + i][col + j]) {
                    if (currElemShape[i][j] && this.#grid[row + i][col + j].getType() !== "base") {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}