let gridContainer = document.querySelector('.grid__container');
let s3gridContainer = document.querySelector('.s3grid__container');

for (let i = 1; i <= 121; ++i) {
    let newElem = document.createElement('button');
    newElem.classList.add('grid__elem');
    newElem.setAttribute('data-index', `${i}`);
    gridContainer.append(newElem);
}

for (let i = 1; i <= 9; ++i) {
    let newElem = document.createElement('button');
    newElem.classList.add('s3grid__elem');
    newElem.setAttribute('data-index', `${i}`);
    s3gridContainer.append(newElem);
}