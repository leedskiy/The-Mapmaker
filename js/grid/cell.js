export class Cell {
    #row;
    #col;
    #type;

    constructor(row, col, type) {
        this.#row = row;
        this.#col = col;
        this.#type = type;
    }

    getRow = () => {
        return this.#row;
    }

    getCol = () => {
        return this.#col;
    }

    getType = () => {
        return this.#type;
    }

    setType = (type) => {
        this.#type = type;
    }
}