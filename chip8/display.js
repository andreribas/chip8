export function createDisplay(id, parent, width, height) {
    let divWrapper = document.createElement('div');
    let canvasElem = document.createElement('canvas');

    divWrapper.appendChild(canvasElem);
    parent.appendChild(divWrapper);

    divWrapper.id = id;
    canvasElem.width = width;
    canvasElem.height = height;

    return canvasElem.getContext('2d');
}

export function drawScreen(vmemory, screen) {
    for (let x = 0; x < 64; x++) {
        for (let y = 0; y < 32; y++) {
            drawPixel(screen, x, y, vmemory.isBitSet(x, y) ? '#00bb00' : '#002200');
        }
    }
}

function drawPixel(ctx, x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x * 10, y * 10, 10, 10);
    ctx.stroke();
}
