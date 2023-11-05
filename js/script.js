let gridContainer = document.querySelector('.grid__container');

for (let i = 1; i <= 121; i++) {
    let newElem = document.createElement('button');
    newElem.classList.add('grid__elem');
    newElem.setAttribute('data-index', `${i}`);
    gridContainer.append(newElem);
}