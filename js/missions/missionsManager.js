import { missions } from "../data/missions.js";
import { BorderlandsMission } from "./borderlandsMission.js";
import { gameController } from "../controllers/gameController.js";

export class MissionsManager {
    #totalPoints;
    #activeMissions;
    #borderlandsMission;

    constructor() {
        this.#totalPoints = 0;
        this.#activeMissions = [];
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

    calculatePointsFromActiveMissions = () => {
        this.#totalPoints = 0;
        //seasons...
        this.#activeMissions.forEach(e => {
            e.checkMissionFulfillment();
            this.#totalPoints += e.getCurrPoints();
        });
    }

    getTotalPointsFromMissions = () => {
        return this.#totalPoints;
    }
}