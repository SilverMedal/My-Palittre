const columnColors = document.querySelectorAll('.palette__color');
const btnForGenerateColor = document.querySelector('.generate-palette__btn');

setRandomColor();

document.addEventListener('click', event => {
    const type = event.target.dataset.type;
    console.log(event.target.dataset);

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    }
})

function setRandomColor() {
    columnColors.forEach((col) => {
        const color = chroma.random();
        let nameColor = col.querySelector('p');
        let buttonLock = col.querySelector('.lock');
        col.style.background = color;
        nameColor.textContent = color;

        setTextColor(nameColor, color);
        setTextColor(buttonLock, color);
    })
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}


btnForGenerateColor.addEventListener('click', () => {
    setRandomColor();
})