import { Mission } from "./mission.js";
import { gameController } from "../controllers/gameController.js";

export class RichCountrysideMission extends Mission {
    constructor(title, description, missionCost, seasonalLetter) {
        super(title, description, missionCost, seasonalLetter);
    }

    checkMissionFulfillment = () => {
        this.currPoints = 0;
        const grid = gameController.getGrid();
        const gridArray = grid.getGrid();
        let typesInCurrRow = [];

        for (let i = 0; i < gridArray.length; i++) {
            typesInCurrRow = [];

            for (let j = 0; j < gridArray[i].length; j++) {
                let cellType = gridArray[i][j].getType();

                if (!typesInCurrRow.includes(cellType) &&
                    cellType !== "base" // if considered that base is not a terrain type
                ) {
                    typesInCurrRow.push(cellType);
                }
            }

            if (typesInCurrRow.length >= 5) {
                this.currPoints += this.missionCost;
            }
        }
    }
}