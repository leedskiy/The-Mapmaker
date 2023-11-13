import { Mission } from "./mission.js";
import { gameController } from "../controllers/gameController.js";

export class SleepyValleyMission extends Mission {
    constructor(title, description, missionCost, seasonalLetter) {
        super(title, description, missionCost, seasonalLetter);
    }

    checkMissionFulfillment = () => {
        this.currPoints = 0;
        const grid = gameController.getGrid();
        const gridArray = grid.getGrid();

        for (let i = 0; i < gridArray.length; i++) {
            let countForest = 0;
            for (let j = 0; j < gridArray[i].length; j++) {
                if (gridArray[i][j].getType() === "forest") {
                    ++countForest;

                    if (countForest === 3) {
                        this.currPoints += this.missionCost;
                        break;
                    }
                }
            }
        }
    }
}