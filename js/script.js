let gridContainer = document.querySelector('.grid__container');
let s3gridContainer = document.querySelector('.s3grid__container');

for (let i = 1; i <= 121; ++i) {
    let newElem = document.createElement('button');
    newElem.classList.add('grid__elem');
    newElem.setAttribute('data-index', `${i}`);
    if (i === 1) {
        newElem.style.cssText = `border-top-left-radius: 5px;`;
    }
    else if (i === 11) {
        newElem.style.cssText = `border-top-right-radius: 5px;`;
    }
    else if (i === 111) {
        newElem.style.cssText = `border-bottom-left-radius: 5px;`;
    }
    else if (i === 121) {
        newElem.style.cssText = `border-bottom-right-radius: 5px;`;
    }
    gridContainer.append(newElem);
}

for (let i = 1; i <= 9; ++i) {
    let newElem = document.createElement('button');
    newElem.classList.add('s3grid__elem');
    newElem.setAttribute('data-index', `${i}`);
    s3gridContainer.append(newElem);
}