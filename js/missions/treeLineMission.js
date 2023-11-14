import { Mission } from "./mission.js";
import { gameController } from "../controllers/gameController.js";

export class TreeLineMission extends Mission {
    constructor(title, description, missionCost, seasonalLetter) {
        super(title, description, missionCost, seasonalLetter);
    }

    checkMissionFulfillment = () => {
        this.currPoints = 0;
        const grid = gameController.getGrid();
        const gridArray = grid.getGrid();
        let maxLength = 0;
        let currLength = 0;
        let theSameTreeLine = false;

        for (let i = 0; i < gridArray[0].length; i++) {
            for (let j = 0; j < gridArray.length; j++) {
                let isForestType = gridArray[j][i].getType() === "forest";
                if (isForestType && !theSameTreeLine) {
                    theSameTreeLine = true;
                    currLength = 1;
                }
                else if (isForestType && theSameTreeLine) {
                    ++currLength;
                }
                else {
                    theSameTreeLine = false;

                    if (currLength > maxLength) {
                        maxLength = currLength;
                    }
                }
            }
        }

        this.currPoints += maxLength * this.missionCost;
    }
}