import { Mission } from "./mission.js";
import { gameController } from "../controllers/gameController.js";

export class TerracedHouseMission extends Mission {
    constructor(title, description, missionCost, seasonalLetter) {
        super(title, description, missionCost, seasonalLetter);
    }

    checkMissionFulfillment = () => {
        this.currPoints = 0;
        const grid = gameController.getGrid();
        const gridArray = grid.getGrid();
        let maxLength = 0;
        let currLength = 0;
        let theSameVillageLine = false;

        for (let i = 0; i < gridArray.length; i++) {
            for (let j = 0; j < gridArray[i].length; j++) {
                let isVillageType = gridArray[i][j].getType() === "village";
                if (isVillageType && !theSameVillageLine) {
                    theSameVillageLine = true;
                    currLength = 1;
                }
                else if (isVillageType && theSameVillageLine) {
                    ++currLength;
                }
                else {
                    theSameVillageLine = false;

                    if (currLength > maxLength) {
                        maxLength = currLength;
                    }
                }
            }
        }

        this.currPoints += maxLength * this.missionCost;
    }
}