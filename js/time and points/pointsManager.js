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
                break;
            case 2:
                this.#seasonalPoints[1] = points;
                break;
            case 3:
                this.#seasonalPoints[2] = points;
                break;
            case 4:
                this.#seasonalPoints[3] = points;
                break;
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