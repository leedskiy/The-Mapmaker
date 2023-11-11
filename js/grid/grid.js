import { Cell } from "./cell.js";

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
    }

    getGrid = () => {
        return this.#grid;
    }
}