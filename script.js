const items = ["5 dolares", "lavadora", "Nada", "iphone", "papas", "tre", "dsa", "mdma"] //document.getElementsByTagName("textarea")[0].value.split("\n");
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const centerX = canvas.width/2
const centerY = canvas.height/2
const radius = canvas.width/2

//default propities
let currentDeg = 0
let step = 360/items.length
let colors = []
let itemDegs = {}


function randomColor(){
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    return {r,g,b}
}

function generateRainbowColors(itemlength){
    generateColors = []

    const hueStep = 360 / itemlength;
    for(let i=0; i <itemlength; i++){
        const hue = i * hueStep - 20;
        const color = `hsl(${hue},90%,50%)`;
        generateColors.push(color);
    }
    console.log(generateColors);
    return generateColors;

}

function toRad(deg){
    return deg * (Math.PI / 180.0);
}
function randomRange(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
}

function getPercent(input,min,max){
    return (((input - min) * 100) / (max - min))/100
}

colors = generateRainbowColors(items.length);

console.log(colors);

function createWheel(){
    step = 360/items.length
    colors = []

    colors = generateRainbowColors(items.length);
}
draw()

function draw(){
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, toRad(0), toRad(360))
    ctx.fillStyle = `rgb(${33},${33},${33})`
    ctx.lineTo(centerX, centerY);
    ctx.fill()

    let startDeg = currentDeg;
    for(let i = 0 ; i < items.length; i++, startDeg += step){
        let endDeg = startDeg + step

        myColor = colors[i];
        let colorStyle = `rgb(${myColor.r},${myColor.g},${myColor.b})`;
        colorStyle = myColor;

        ctx.beginPath();
        rad = toRad(360/step);
        ctx.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg));
        ctx.fillStyle = colorStyle;
        ctx.lineTo(centerX, centerY);
        ctx.fill()


        // draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(toRad((startDeg + endDeg)/2));
        ctx.textAlign = "center";
        if(myColor.r > 150 || myColor.g > 150 || myColor.b > 150){
            ctx.fillStyle = "#000";
        }
        else{
            ctx.fillStyle = "#fff";
        }
        ctx.font = 'bold 24px serif';
        ctx.fillText(items[i], 130, 10);
        ctx.restore();

        itemDegs[i] = 
            {
            "startDeg": startDeg,
            "endDeg" : endDeg
            }
        

        // check winner
        
        if(startDeg%360 < 270 && startDeg%360 > 180  && endDeg % 360 > 270 && endDeg%360 < 360 ){
            document.getElementById("winner").innerHTML = items[i]
        }
    }
}


let speed = 0
let maxRotation = randomRange(360* 3, 360 * 6);
console.log("maxi",maxRotation);
let pause = false;
function animate(){
    if(pause){
        return
    }
    speed = easeOutSine(getPercent(currentDeg ,maxRotation ,0)) * 20
    if(speed < 0.01){
        speed = 0
        pause = true
    }
    currentDeg += speed
    draw()
    window.requestAnimationFrame(animate);
}

function spin(){
    if(speed != 0){
        return
    }

    maxRotation = 0;
    currentDeg = 0
    createWheel()
    draw();

    maxRotation = randomRange(360* 3, 360 * 6);
    itemDegs = {}
    console.log("max",maxRotation)
    console.log(itemDegs);
    pause = false
    window.requestAnimationFrame(animate);
}