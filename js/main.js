const columnColors = document.querySelectorAll('.palette__color');
const btnForGenerateColor = document.querySelector('.generate-palette__btn');



document.addEventListener('click', event => {
    const type = event.target.dataset.type;
    console.log(event.target.dataset);

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (type === 'copy') {
        copyTextFromBoard(event.target.textContent);
    }
})

btnForGenerateColor.addEventListener('click', () => {
    setRandomColor();
})

function copyTextFromBoard(text) {
    return navigator.clipboard.writeText(text);
}

function updateHashColor(colors = []) {
    document.location.hash = colors.map((col) => {
        return col.toString().substring(1);
    })
        .join('-');
}

function generateColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map(color => '#' + color);
    }
    return [];
}

function setRandomColor(isInit) {
    let colors = isInit ? generateColorsFromHash() : [];
    columnColors.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        let nameColor = col.querySelector('p');
        let buttonLock = col.querySelector('.lock');

        if (isLocked) {
            colors.push(nameColor.textContent);
            return;
        }

        const color = isInit
            ? colors[index]
                ? colors[index]
                : chroma.random()
        : chroma.random();

        if (!isInit) {
            colors.push(color);
        }



        col.style.background = color;
        nameColor.textContent = color;

        setTextColor(nameColor, color);
        setTextColor(buttonLock, color);

    })
    if (!isInit) {
        updateHashColor(colors);
    }

}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColor(true);

