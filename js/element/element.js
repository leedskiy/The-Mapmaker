export class Element {
    #time;
    #type;
    #shape;
    #rotation;
    #mirrored;

    constructor(time, type, shape, rotation, mirrored) {
        this.#time = time;
        this.#type = type;
        this.#shape = shape;
        this.#rotation = rotation;
        this.#mirrored = mirrored;
    }

    getTime = () => {
        return this.#time;
    }

    getType = () => {
        return this.#type;
    }

    getShape = () => {
        return this.#shape;
    }

    getRotation = () => {
        return this.#rotation;
    }

    getMirrored = () => {
        return this.#mirrored;
    }

    rotate = () => {
        let rotatedShape = [];

        for (let i = 0; i < this.#shape.length; i++) {
            let row = [0, 0, 0];
            rotatedShape.push(row);
        }

        for (let i = 0; i < this.#shape.length; i++) {
            for (let j = 0; j < this.#shape[i].length; j++) {
                rotatedShape[i][j] = this.#shape[this.#shape[i].length - 1 - j][i];
            }
        }

        this.#shape = rotatedShape;
        this.#rotation === 3 ? this.#rotation = 0 : this.#rotation += 1;
    }

    flip = () => {
        for (let i = 0; i < this.#shape.length; i++) {
            this.#shape[i].reverse();
        }

        this.#mirrored = !this.#mirrored;
    }

    getCellsHtml = () => {
        const cellsHtml = [];

        for (let i = 0; i < this.#shape.length; ++i) {
            for (let j = 0; j < this.#shape[i].length; j++) {
                let cellHtml;

                if (this.#shape[i][j] === 1) {
                    cellHtml = `<img class="s3grid__elem gelem" src="img/tiles/${this.#type}_tile.png"` +
                        `alt="${this.#type}_cell" data-row="${i}" data-col="${j}">`
                }
                else {
                    cellHtml = `<img class="s3grid__elem gelem" src="img/tiles/base_tile.png"` +
                        `alt="base_cell" data-row="${i}" data-col="${j}">`
                }

                cellsHtml.push(cellHtml);
            }
        }

        return cellsHtml;
    }
}