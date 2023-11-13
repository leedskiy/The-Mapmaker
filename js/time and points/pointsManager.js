import { gameController } from "../controllers/gameController.js";

export class PointsManager {
    #seasonalPoints;
    #pointsTotal;

    constructor() {
        this.#seasonalPoints = [0, 0, 0, 0];
        this.#pointsTotal = 0;
    }

    setCurrSeasonPoints = (points) => {
        const timeAndSeason = gameController.getTimeAndSeason();
        const currSeason = timeAndSeason.getCurrSeason();
        let newPoints = 0;

        switch (currSeason) {
            case 1:
                this.#seasonalPoints[0] = points;
            case 2:
                newPoints = points - this.#seasonalPoints[0];
                this.#seasonalPoints[1] = newPoints;
            case 3:
                newPoints = points - this.#seasonalPoints[0] - this.#seasonalPoints[1];
                this.#seasonalPoints[2] = newPoints;
            case 4:
                newPoints = points - this.#seasonalPoints[0] - this.#seasonalPoints[1] - this.#seasonalPoints[2];
                this.#seasonalPoints[3] = newPoints;
        }
    }

    getCurrSeasonPoints = () => {
        const timeAndSeason = gameController.getTimeAndSeason();
        return this.#seasonalPoints[timeAndSeason.getCurrSeason() - 1];
    }

    getSeasonalPoints = () => {
        return this.#seasonalPoints;
    }

    calculatePointsTotal = () => {
        this.#pointsTotal = 0;
        this.#seasonalPoints.map((e) => this.#pointsTotal += e);
    }

    getPointsTotal = () => {
        return this.#pointsTotal;
    }
}