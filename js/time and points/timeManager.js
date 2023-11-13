export class TimeManager {
    #currTime;
    #currSeason;

    constructor() {
        this.#currTime = 0;
        this.#currSeason = 1;
    }

    getCurrTime() {
        return this.#currTime;
    }

    adjustCurrTime(time) {
        if (this.#currTime + time >= 7) {
            if (this.#currSeason + 1 <= 4) {
                this.#currSeason += 1;
            }

            this.#currTime = 0;
        }
        else {
            this.#currTime += time;
        }
    }

    getCurrSeason() {
        return this.#currSeason;
    }
}