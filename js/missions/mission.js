export class Mission {
    _title;
    _description;
    _currPoints;
    _missionCost;
    _seasonalLetter;

    constructor(title, description, missionCost, seasonalLetter) {
        this._title = title;
        this._description = description;
        this._currPoints = 0;
        this._missionCost = missionCost;
        this._seasonalLetter = seasonalLetter;
    }

    get title() {
        return this._title;
    }

    set title(newTitle) {
        this._title = newTitle;
    }

    get currPoints() {
        return this._currPoints;
    }

    set currPoints(newPoints) {
        this._currPoints = newPoints;
    }

    get missionCost() {
        return this._missionCost;
    }

    set missionCost(newMissionCost) {
        this._missionCost = newMissionCost;
    }

    get seasonalLetter() {
        return this._seasonalLetter;
    }

    set seasonalLetter(newSeasonalLetter) {
        this._seasonalLetter = newSeasonalLetter;
    }

    getTitle = () => {
        return this._title;
    }

    getTitle = () => {
        return this._title;
    }

    getDescription = () => {
        return this._description;
    }

    getCurrPoints = () => {
        return this._currPoints;
    }

    getMissionCost = () => {
        return this._missionCost;
    }

    getSeasonalLetter = () => {
        return this._seasonalLetter;
    }

    setSeasonalLetter = (seasonalLetter) => {
        this._seasonalLetter = seasonalLetter;
    }

    checkMissionFulfillment = () => { }
}