import { Mission } from "./mission.js";
import { gameController } from "../controllers/gameController.js";

export class WateringCanal extends Mission {
    constructor(title, description, missionCost, seasonalLetter) {
        super(title, description, missionCost, seasonalLetter);
    }

    checkMissionFulfillment = () => {
        this.currPoints = 0;
        const grid = gameController.getGrid();
        const gridArray = grid.getGrid();
        let waterTypeCount = 0;
        let plainsTypeCount = 0;

        for (let i = 0; i < gridArray[0].length; i++) {
            waterTypeCount = 0;
            plainsTypeCount = 0;
            for (let j = 0; j < gridArray.length; j++) {
                if (gridArray[j][i].getType() === "water") {
                    ++waterTypeCount;
                }
                else if (gridArray[j][i].getType() === "plains") {
                    ++plainsTypeCount;
                }
            }

            console.log("waterTypeCount", waterTypeCount);
            console.log("plainsTypeCount", plainsTypeCount);
            console.log("\n\n");

            if (waterTypeCount > 0 && plainsTypeCount > 0 && waterTypeCount === plainsTypeCount) {
                this.currPoints += this.missionCost;
            }
        }
    }
}