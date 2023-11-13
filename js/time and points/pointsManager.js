import { gameController } from "../controllers/gameController.js";

export class PointsManager {
    #seasonalPoints;
    #pointsTotal;

    constructor() {
        this.#seasonalPoints = [0, 0, 0, 0];
        this.#pointsTotal = 0;
    }

    adjustCurrSeasonPoints(points) {
        const timeAndSeason = gameController.getTimeAndSeason();
        this.#seasonalPoints[timeAndSeason.getCurrSeason() - 1] += points;
    }

    getCurrSeasonPoints() {
        const timeAndSeason = gameController.getTimeAndSeason();
        return this.#seasonalPoints[timeAndSeason.getCurrSeason() - 1];
    }

    calculatePointsTotal() {
        this.#seasonalPoints.map((e) => this.#pointsTotal += e);
    }

    getPointsTotal() {
        return this.#pointsTotal;
    }
}