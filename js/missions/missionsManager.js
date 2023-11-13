import { missions } from "../data/missions.js";
import { gameController } from "../controllers/gameController.js";
import { SurroundedMountainDefaultMission } from "./surroundedMountainDefaultMission.js";

import { BorderlandsMission } from "./borderlandsMission.js";
import { EdgeOfTheForestMission } from "./edgeOfTheForestMission.js";
import { SleepyValleyMission } from "./sleepyValleyMission.js";

export class MissionsManager {
    #activeMissionsTotalPoints;
    #activeMissions;
    #surrMountainMissionPoints;
    #surrMountainDefMission;

    #fullMissionsList;

    constructor() {
        this.#activeMissionsTotalPoints = 0;
        this.#activeMissions = [];
        this.#surrMountainMissionPoints = 0;
        this.#surrMountainDefMission = new SurroundedMountainDefaultMission("Surrounded mountain",
            "If you surround the mountains on 4 sides, you get 1 point per surrounded mountain", 1, "no season");

        this.#fullMissionsList = [];
        this.#fullMissionsList.push(new BorderlandsMission(missions["basic"][3].title,
            missions["basic"][3].description, 6, 'A'));
        this.#fullMissionsList.push(new EdgeOfTheForestMission(missions["basic"][0].title,
            missions["basic"][0].description, 1, 'A'));
        this.#fullMissionsList.push(new SleepyValleyMission(missions["basic"][1].title,
            missions["basic"][1].description, 4, 'A'));
    }

    getMissionList = () => {
        return this.#fullMissionsList;
    }

    updateActiveMissions = () => {
        gameController.randomizeArray(this.#fullMissionsList);
        this.#activeMissions.push(this.#fullMissionsList[0]);
        this.#activeMissions.push(this.#fullMissionsList[1]);
        this.#activeMissions.push(this.#fullMissionsList[2]);
        // this.#activeMissions.push(this.#fullMissionsList[3]);
        this.#activeMissions[0].seasonalLetter = 'A';
        this.#activeMissions[1].seasonalLetter = 'B';
        this.#activeMissions[2].seasonalLetter = 'C';
        // this.#activeMissions[3].seasonalLetter = 'D';
    }

    getActiveMissionsArray = () => {
        return this.#activeMissions;
    }

    calcPtsFromActMissions = () => {
        this.#activeMissionsTotalPoints = 0;
        //seasons...
        this.#activeMissions.forEach(e => {
            e.checkMissionFulfillment();
            this.#activeMissionsTotalPoints += e.getCurrPoints();
        });
    }

    getTtlPtsFromActMissions = () => {
        return this.#activeMissionsTotalPoints;
    }

    calcSurrMountMissionPts = () => {
        this.#surrMountainDefMission.checkMissionFulfillment();
        this.#surrMountainMissionPoints = this.#surrMountainDefMission.getCurrPoints();
    }

    getSurrMountainMissionPoints = () => {
        return this.#surrMountainMissionPoints;
    }
}