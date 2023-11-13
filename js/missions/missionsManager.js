import { missions } from "../data/missions.js";
import { BorderlandsMission } from "./borderlandsMission.js";
import { SurroundedMountainDefaultMission } from "./surroundedMountainDefaultMission.js";
import { gameController } from "../controllers/gameController.js";

export class MissionsManager {
    #activeMissionsTotalPoints;
    #activeMissions;
    #surrMountainMissionPoints;
    #surrMountainDefMission;

    #borderlandsMission;

    constructor() {
        this.#activeMissionsTotalPoints = 0;
        this.#activeMissions = [];
        this.#surrMountainMissionPoints = 0;
        this.#surrMountainDefMission = new SurroundedMountainDefaultMission("Surrounded mountain",
            "If you surround the mountains on 4 sides, you get 1 point per surrounded mountain", 1, "no season");

        this.#borderlandsMission = new BorderlandsMission(missions["basic"][3].title,
            missions["basic"][3].description, 6, 'A');
    }

    getMissionList = () => {
        return [
            this.#borderlandsMission
        ]
    }

    updateActiveMissions = () => {
        let allMissions = this.getMissionList();
        gameController.randomizeArray(allMissions);
        this.#activeMissions.push(allMissions[0]);
        // this.#activeMissions.push(allMissions[1]);
        // this.#activeMissions.push(allMissions[2]);
        // this.#activeMissions.push(allMissions[3]);
        this.#activeMissions[0].seasonalLetter = 'A';
        // this.#activeMissions[1].seasonalLetter = 'B';
        // this.#activeMissions[2].seasonalLetter = 'C';
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