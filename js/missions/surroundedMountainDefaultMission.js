import { Mission } from "./mission.js";
import { gameController } from "../controllers/gameController.js";

export class SurroundedMountainDefaultMission extends Mission {
    constructor(title, description, missionCost, seasonalLetter) {
        super(title, description, missionCost, seasonalLetter);
    }

    checkMissionFulfillment = () => {
        this.currPoints = 0;
        const grid = gameController.getGrid();
        const gridArray = grid.getGrid();

        for (let i = 0; i < gridArray.length; i++) {
            for (let j = 0; j < gridArray[i].length; j++) {
                if (gridArray[i][j].getType() === "mountain") {
                    if (
                        i < gridArray.length - 1 && i > 0 &&
                        j < gridArray[i].length - 1 && j > 0 &&
                        gridArray[i - 1][j].getType() !== "base" &&
                        gridArray[i][j + 1].getType() !== "base" &&
                        gridArray[i + 1][j].getType() !== "base" &&
                        gridArray[i][j - 1].getType() !== "base"
                    ) {
                        this.currPoints += this.missionCost;
                    }
                }
            }
        }
    }
}