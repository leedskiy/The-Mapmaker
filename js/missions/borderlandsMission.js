import { Mission } from "./mission.js";
import { gameController } from "../controllers/gameController.js";

export class BorderlandsMission extends Mission {
    constructor(title, description, missionCost, seasonalLetter) {
        super(title, description, missionCost, seasonalLetter);
    }

    checkMissionFulfillment() {
        this.currPoints = 0;
        const grid = gameController.getGrid();

        for (let i = 0; i < grid.getGrid().length; i++) {
            let isFullRow = grid.getGrid()[i].every((e) => e.getType() !== "base");

            if (isFullRow) {
                this.currPoints += this.missionCost;
            }
        }

        for (let i = 0; i < grid.getGrid()[0].length; i++) {
            let isFullCol = grid.getGrid().every((e) => e[i].getType() !== "base");

            if (isFullCol) {
                this.currPoints += this.missionCost;
            }
        }
    }
}