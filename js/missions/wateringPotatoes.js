import { Mission } from "./mission.js";
import { gameController } from "../controllers/gameController.js";

export class WateringPotatoes extends Mission {
    constructor(title, description, missionCost, seasonalLetter) {
        super(title, description, missionCost, seasonalLetter);
    }

    checkMissionFulfillment = () => {
        this.currPoints = 0;
        const grid = gameController.getGrid();
        const gridArray = grid.getGrid();

        for (let i = 0; i < gridArray.length; i++) {
            for (let j = 0; j < gridArray[i].length; j++) {
                if (gridArray[i][j].getType() === "plains") {
                    if (i > 0 && gridArray[i - 1][j].getType() === "water") {
                        this.currPoints += this.missionCost;
                    }

                    if (
                        j < gridArray[i].length - 1 &&
                        gridArray[i][j + 1].getType() === "water"
                    ) {
                        this.currPoints += this.missionCost;
                    }

                    if (
                        i < gridArray.length - 1 &&
                        gridArray[i + 1][j].getType() === "water"
                    ) {
                        this.currPoints += this.missionCost;
                    }

                    if (j > 0 && gridArray[i][j - 1].getType() === "water") {
                        this.currPoints += this.missionCost;
                    }
                }
            }
        }
    }
}