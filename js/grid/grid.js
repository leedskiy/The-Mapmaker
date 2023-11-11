import { Cell } from "./cell.js";
import { mountains } from "../data/mountains.js";

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
                let cell = new Cell(i, j, "base");
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
}