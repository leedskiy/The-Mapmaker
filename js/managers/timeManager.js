export class TimeManager {
    #currTime;
    #currSeason;
    #gameEnd;

    constructor() {
        this.#currTime = 0;
        this.#currSeason = 1;
        this.#gameEnd = false;
    }

    getCurrTime = () => {
        return this.#currTime;
    }

    adjustCurrTime = (time) => {
        if (this.#currTime + time >= 7) {
            if (this.#currSeason + 1 <= 4) {
                this.#currSeason += 1;
            }
            else {
                this.#gameEnd = true;
            }

            this.#currTime = 0;
        }
        else {
            this.#currTime += time;
        }
    }

    getCurrSeason = () => {
        return this.#currSeason;
    }

    getGameEnd = () => {
        return this.#gameEnd;
    }

    setGameEnd = (gameEnd) => {
        this.#gameEnd = gameEnd;
    }
}