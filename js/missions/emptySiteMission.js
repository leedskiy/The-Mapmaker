import { Mission } from "./mission.js";
import { gameController } from "../controllers/gameController.js";

export class EmptySiteMission extends Mission {
    constructor(title, description, missionCost, seasonalLetter) {
        super(title, description, missionCost, seasonalLetter);
    }

    checkMissionFulfillment = () => {
        this.currPoints = 0;
        const grid = gameController.getGrid();
        const gridArray = grid.getGrid();
        let checkedFields = [];
        let contains = false;

        for (let i = 0; i < gridArray.length; i++) {
            for (let j = 0; j < gridArray[i].length; j++) {
                if (gridArray[i][j].getType() === "village") {
                    if (i > 0 && gridArray[i - 1][j].getType() === "base") {
                        contains = false;

                        for (let k = 0; k < checkedFields.length && !contains; k++) {
                            if (checkedFields[k] === `${i - 1} ${j}`) {
                                contains = true;
                            }
                        }

                        if (!contains) {
                            checkedFields.push(`${i - 1} ${j}`);
                            this.currPoints += this.missionCost;
                        }
                    }

                    if (j < gridArray[i].length - 1 &&
                        gridArray[i][j + 1].getType() === "base"
                    ) {
                        contains = false;

                        for (let k = 0; k < checkedFields.length && !contains; k++) {
                            if (checkedFields[k] === `${i} ${j + 1}`) {
                                contains = true;
                            }
                        }

                        if (!contains) {
                            checkedFields.push(`${i} ${j + 1}`);
                            this.currPoints += this.missionCost;
                        }
                    }

                    if (i < gridArray.length - 1 &&
                        gridArray[i + 1][j].getType() === "base"
                    ) {
                        contains = false;

                        for (let k = 0; k < checkedFields.length && !contains; k++) {
                            if (checkedFields[k] === `${i + 1} ${j}`) {
                                contains = true;
                            }
                        }

                        if (!contains) {
                            checkedFields.push(`${i + 1} ${j}`);
                            this.currPoints += this.missionCost;
                        }
                    }

                    if (j > 0 && gridArray[i][j - 1].getType() === "base") {
                        contains = false;

                        for (let k = 0; k < checkedFields.length && !contains; k++) {
                            if (checkedFields[k] === `${i} ${j - 1}`) {
                                contains = true;
                            }
                        }

                        if (!contains) {
                            checkedFields.push(`${i} ${j - 1}`);
                            this.currPoints += this.missionCost;
                        }
                    }

                    console.log(checkedFields);
                }
            }
        }
    }
}