import { Mission } from "./mission.js";
import { gameController } from "../controllers/gameController.js";

export class OddNumberedSilosMission extends Mission {
    constructor(title, description, missionCost, seasonalLetter) {
        super(title, description, missionCost, seasonalLetter);
    }

    checkMissionFulfillment = () => {
        this.currPoints = 0;
        const grid = gameController.getGrid();
        const gridArray = grid.getGrid();
        let isFullyFilled = true;

        for (let i = 0; i < gridArray[0].length; i++) {
            if ((i + 1) % 2 !== 0) {
                isFullyFilled = true;
                for (let j = 0; j < gridArray.length && isFullyFilled; j++) {
                    if (gridArray[j][i].getType() === "base") {
                        isFullyFilled = false;
                    }
                }

                if (isFullyFilled) {
                    this.currPoints += this.missionCost;
                }
            }
        }
    }
}