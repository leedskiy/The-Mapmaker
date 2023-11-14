import { missions } from "../data/missionsData.js";
import { gameController } from "../controllers/gameController.js";
import { SurroundedMountainDefaultMission } from "../missions/surroundedMountainDefaultMission.js";

import { BorderlandsMission } from "../missions/borderlandsMission.js";
import { EdgeOfTheForestMission } from "../missions/edgeOfTheForestMission.js";
import { SleepyValleyMission } from "../missions/sleepyValleyMission.js";
import { WateringPotatoesMission } from "../missions/wateringPotatoesMission.js";

import { TreeLineMission } from "../missions/treeLineMission.js";
import { WateringCanal } from "../missions/wateringCanalMission.js";
import { WealthyTownMission } from "../missions/wealthyTownMission.js";
import { MagiciansValleyMission } from "../missions/magiciansValleyMission.js";
import { EmptySiteMission } from "../missions/emptySiteMission.js";
import { TerracedHouseMission } from "../missions/terracedHouseMission.js";
import { OddNumberedSilosMission } from "../missions/oddNumberedSilosMission.js";

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
        this.#fullMissionsList.push(new WateringPotatoesMission(missions["basic"][2].title,
            missions["basic"][2].description, 2, 'A'));

        this.#fullMissionsList.push(new TreeLineMission(missions["extra"][0].title,
            missions["extra"][0].description, 2, 'A'));
        this.#fullMissionsList.push(new WateringCanal(missions["extra"][1].title,
            missions["extra"][1].description, 4, 'A'));
        this.#fullMissionsList.push(new WealthyTownMission(missions["extra"][2].title,
            missions["extra"][2].description, 3, 'A'));
        this.#fullMissionsList.push(new MagiciansValleyMission(missions["extra"][3].title,
            missions["extra"][3].description, 3, 'A'));
        this.#fullMissionsList.push(new EmptySiteMission(missions["extra"][4].title,
            missions["extra"][4].description, 2, 'A'));
        this.#fullMissionsList.push(new TerracedHouseMission(missions["extra"][5].title,
            missions["extra"][5].description, 2, 'A'));
        this.#fullMissionsList.push(new OddNumberedSilosMission(missions["extra"][6].title,
            missions["extra"][6].description, 10, 'A'));
    }

    getFullMissionList = () => {
        return this.#fullMissionsList;
    }

    updateActiveMissions = () => {
        gameController.randomizeArray(this.#fullMissionsList);

        this.#activeMissions.push(this.#fullMissionsList[0]);
        // this.#activeMissions.push(this.#fullMissionsList[1]);
        // temporary for testing
        let newMissionName = "Odd numbered silos";
        this.#fullMissionsList.forEach(e => {
            if (e.getTitle() === newMissionName) {
                this.#activeMissions.push(e);
            }
        })
        for (let i = 1; i < 3; i++) {
            if (this.#fullMissionsList[i].getTitle() !== newMissionName) {
                this.#activeMissions.push(this.#fullMissionsList[i]);
            }
        }
        // this.#activeMissions.push(this.#fullMissionsList[2]);
        // this.#activeMissions.push(this.#fullMissionsList[3]);

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