import { missions } from "../data/missions.js";
import { gameController } from "../controllers/gameController.js";
import { SurroundedMountainDefaultMission } from "./surroundedMountainDefaultMission.js";

import { BorderlandsMission } from "./borderlandsMission.js";
import { EdgeOfTheForestMission } from "./edgeOfTheForestMission.js";
import { SleepyValleyMission } from "./sleepyValleyMission.js";
import { WateringPotatoes } from "./wateringPotatoes.js";

export class MissionsManager {
    #ssnlMissionsTotalPoints;
    #activeMissions;
    #surrMountainMissionPoints;
    #surrMountainDefMission;
    #currentSeasonLetters;

    #fullMissionsList;

    constructor() {
        this.#ssnlMissionsTotalPoints = 0;
        this.#activeMissions = [];
        this.#surrMountainMissionPoints = 0;
        this.#currentSeasonLetters = [];
        this.#surrMountainDefMission = new SurroundedMountainDefaultMission("Surrounded mountain",
            "If you surround the mountains on 4 sides, you get 1 point per surrounded mountain", 1, "no season");

        this.#fullMissionsList = [];
        this.#fullMissionsList.push(new BorderlandsMission(missions["basic"][3].title,
            missions["basic"][3].description, 6, 'A'));
        this.#fullMissionsList.push(new EdgeOfTheForestMission(missions["basic"][0].title,
            missions["basic"][0].description, 1, 'A'));
        this.#fullMissionsList.push(new SleepyValleyMission(missions["basic"][1].title,
            missions["basic"][1].description, 4, 'A'));
        this.#fullMissionsList.push(new WateringPotatoes(missions["basic"][2].title,
            missions["basic"][2].description, 2, 'A'));
    }

    getFullMissionList = () => {
        return this.#fullMissionsList;
    }

    updateActiveMissions = () => {
        gameController.randomizeArray(this.#fullMissionsList);

        this.#activeMissions.push(this.#fullMissionsList[0]);
        this.#activeMissions.push(this.#fullMissionsList[1]);
        this.#activeMissions.push(this.#fullMissionsList[2]);
        this.#activeMissions.push(this.#fullMissionsList[3]);

        this.#activeMissions[0].setSeasonalLetter('A');
        this.#activeMissions[1].setSeasonalLetter('B');
        this.#activeMissions[2].setSeasonalLetter('C');
        this.#activeMissions[3].setSeasonalLetter('D');
    }


    getActiveMissions = () => {
        return this.#activeMissions;
    }

    updateCurrentSeasonLetters = () => {
        this.#currentSeasonLetters = [];
        const timeAndSeason = gameController.getTimeAndSeason();

        switch (timeAndSeason.getCurrSeason()) {
            case 1:
                this.#currentSeasonLetters.push('A');
                this.#currentSeasonLetters.push('B');
                break;
            case 2:
                this.#currentSeasonLetters.push('B');
                this.#currentSeasonLetters.push('C');
                break;
            case 3:
                this.#currentSeasonLetters.push('C');
                this.#currentSeasonLetters.push('D');
                break;
            case 4:
                this.#currentSeasonLetters.push('D');
                this.#currentSeasonLetters.push('A');
                break;
        }
    }

    getCurrentSeasonLetters = () => {
        return this.#currentSeasonLetters;
    }

    calcPtsFromSeasonalMissions = () => {
        this.#ssnlMissionsTotalPoints = 0;
        this.#activeMissions.forEach(e => {
            if (this.#currentSeasonLetters[0] === e.getSeasonalLetter()
                || this.#currentSeasonLetters[1] === e.getSeasonalLetter()
            ) {
                e.checkMissionFulfillment();
                this.#ssnlMissionsTotalPoints += e.getCurrPoints();
            }
        });
    }

    getPtsFromSeasonalMissions = () => {
        return this.#ssnlMissionsTotalPoints;
    }

    calcSurrMountMissionPts = () => {
        this.#surrMountainDefMission.checkMissionFulfillment();
        this.#surrMountainMissionPoints = this.#surrMountainDefMission.getCurrPoints();
    }

    getSurrMountainMissionPoints = () => {
        return this.#surrMountainMissionPoints;
    }
}