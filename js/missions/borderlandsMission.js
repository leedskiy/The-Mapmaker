import { Mission } from "./mission.js";
import { gameController } from "../controllers/gameController.js";

export class BorderlandsMission extends Mission {
    constructor(title, description, missionCost, seasonalLetter) {
        super(title, description, missionCost, seasonalLetter);
    }

    checkMissionFulfillment = () => {
        this.currPoints = 0;
        const grid = gameController.getGrid();
        const gridArray = grid.getGrid();

        for (let i = 0; i < gridArray.length; i++) {
            let isFullRow = gridArray[i].every((e) => e.getType() !== "base");

            if (isFullRow) {
                this.currPoints += this.missionCost;
            }
        }

        for (let i = 0; i < gridArray[0].length; i++) {
            let isFullCol = gridArray.every((e) => e[i].getType() !== "base");

            if (isFullCol) {
                this.currPoints += this.missionCost;
            }
        }
    }
}