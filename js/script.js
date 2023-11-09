let gridContainer = document.querySelector('.grid__container');
let s3gridContainer = document.querySelector('.s3grid__container');

for (let i = 1; i <= 11; ++i) {
    for (let j = 1; j <= 11; ++j) {
        let newElem = document.createElement('img');
        newElem.classList.add('grid__elem');
        newElem.classList.add('gelem');
        newElem.setAttribute('src', `img/tiles/base_tile.png`);
        newElem.setAttribute('data-row', `${i}`);
        newElem.setAttribute('data-col', `${j}`);
        gridContainer.append(newElem);
    }
}

for (let i = 1; i <= 3; ++i) {
    for (let j = 1; j <= 3; ++j) {
        let newElem = document.createElement('img');
        newElem.classList.add('s3grid__elem');
        newElem.classList.add('gelem');
        newElem.setAttribute('src', `img/tiles/base_tile.png`);
        newElem.setAttribute('data-row', `${i}`);
        newElem.setAttribute('data-col', `${j}`);
        s3gridContainer.append(newElem);
    }
}