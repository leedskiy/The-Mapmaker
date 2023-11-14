import { Mission } from "./mission.js";
import { gameController } from "../controllers/gameController.js";

export class WealthyTownMission extends Mission {
    constructor(title, description, missionCost, seasonalLetter) {
        super(title, description, missionCost, seasonalLetter);
    }

    checkMissionFulfillment = () => {
        this.currPoints = 0;
        const grid = gameController.getGrid();
        const gridArray = grid.getGrid();
        let typesAround = [];

        for (let i = 0; i < gridArray.length; i++) {
            for (let j = 0; j < gridArray[i].length; j++) {
                if (gridArray[i][j].getType() === "village") {
                    typesAround = [];

                    if (i > 0) {
                        let cellType = gridArray[i - 1][j].getType();

                        if (
                            cellType !== "base" && // if considered that base is not a terrain type
                            !typesAround.includes(cellType)
                        ) {
                            typesAround.push(cellType);
                        }
                    }
                    if (j < gridArray[i].length - 1) {
                        let cellType = gridArray[i][j + 1].getType();

                        if (
                            cellType !== "base" && // if considered that base is not a terrain type
                            !typesAround.includes(cellType)
                        ) {
                            typesAround.push(cellType);
                        }
                    }
                    if (i < gridArray.length - 1) {
                        let cellType = gridArray[i + 1][j].getType();

                        if (cellType !== "base" && // if considered that base is not a terrain type
                            !typesAround.includes(cellType)
                        ) {
                            typesAround.push(cellType);
                        }
                    }
                    if (j > 0) {
                        let cellType = gridArray[i][j - 1].getType();

                        if (cellType !== "base" && // if considered that base is not a terrain type
                            !typesAround.includes(cellType)
                        ) {
                            typesAround.push(cellType);
                        }
                    }

                    if (typesAround.length >= 3) {
                        console.log(gridArray[i][j]);
                        this.currPoints += this.missionCost;
                    }
                }
            }
        }
    }
}