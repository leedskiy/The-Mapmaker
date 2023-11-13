import { Mission } from "./mission.js";
import { gameController } from "../controllers/gameController.js";

export class EdgeOfTheForestMission extends Mission {
    constructor(title, description, missionCost, seasonalLetter) {
        super(title, description, missionCost, seasonalLetter);
    }

    checkMissionFulfillment = () => {
        this.currPoints = 0;
        const grid = gameController.getGrid();
        const gridArray = grid.getGrid();

        for (let i = 0; i < gridArray.length; i++) {
            for (let j = 0; j < gridArray[i].length; j++) {
                if (gridArray[i][j].getType() === "forest") {
                    if (
                        i - 1 === -1 ||
                        i + 1 === gridArray.length ||
                        j - 1 === -1 ||
                        j + 1 === gridArray[i].length
                    ) {
                        this.currPoints += this.missionCost;
                    }
                }
            }
        }
    }
}