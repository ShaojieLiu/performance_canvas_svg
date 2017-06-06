/**
 * Created by liushaojie on 2017/6/5.
 */
let btn = `<button id="animationButton">canvasButton</button>
            <button id="svgButton">svgButton</button>`,
    dadClass = 'game9'

insert('压力动画帧率', dadClass, 9, btn)

let ball = (f) => {
    return{
        x:150,
        y:75,
        lastX:150,
        lastY:75,
        velorityX: 0.01*f,
        velorityY: 0.01*f,
        radius:20,
        strokeStyle:`#${Math.floor(Math.random()*(2 << 23)).toString(16)}`

    }
}
let ballNum = 2000
let balls = (num) => {
    let result = [], factor = 1
    for(let i = 0; i < num; i++) {
        result.push(i*factor)
    }
    return result.map(ball)
}

var canvas = document.getElementById('canvas9'),
    ctx = canvas.getContext('2d'),
    paused = false,
    discs = balls(ballNum)
    // discs = [
    //     {
    //         x:150,
    //         y:75,
    //         lastX:150,
    //         lastY:75,
    //         velorityX:1.5,
    //         velorityY:1.2,
    //         radius:25,
    //         strokeStyle: `#${Math.floor(Math.random()*(2 << 23)).toString(16)}`
    //     }
    // ],
    numDiscs = discs.length,
    animationButton = document.getElementById('animationButton');

function drawBackground(){

}
function update(){
    var disc = null;

    for (var i =0; i < numDiscs; i++) {
        disc = discs[i];
        if (disc.x + disc.velorityX + disc.radius >
            canvas.width ||
            disc.x + disc.velorityX - disc.radius < 0)
            disc.velorityX = -disc.velorityX;
        if (disc.y + disc.velorityY + disc.radius >
            canvas.height ||
            disc.y + disc.velorityY - disc.radius < 0)
            disc.velorityY = -disc.velorityY;
        disc.x += disc.velorityX;
        disc.y += disc.velorityY;
    }
}

function draw(){
    var disc = discs[i];
    for (var i = 0; i < numDiscs; i++) {
        disc = discs[i];
        // gradient = ctx.createRadialGradient(disc.x,disc.y,0,
        //     disc.x,disc.y,disc.radius);//放射渐变
        // gradient.addColorStop(0.3,disc.innerColor);
        // gradient.addColorStop(0.5,disc.middleColor);
        // gradient.addColorStop(1.0,disc.outerColor);

        ctx.save();
        ctx.beginPath();
        ctx.arc(disc.x,disc.y,disc.radius,0,Math.PI*2,false);
        ctx.fillStyle = 'transparent';
        ctx.strokeStyle = disc.strokeStyle;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}

//calculate frame rate
var lastTime = 0;
function calculateFps(){
    var now = (+new Date),
        fps = 1000/(now - lastTime);
    lastTime = now;
    return fps;
}

//以不同的帧速率来执行不同的任务
var lastFpsUpdateTime = 0,
    lastFpsUpdate = 0;

//Animation
function animate(time){
    let fps = 0;
    if (time == undefined) {
        time = +new Date;//+new Date()是一个东西;  +相当于.valueOf();
    };
    if (!paused) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        //drawBackground();
        update();
        draw();
        var now = + new Date();
        //console.log(now);
        fps = calculateFps();

        if (now - lastFpsUpdateTime > 1000) {
            lastFpsUpdateTime = now;
            lastFpsUpdate = fps;

            if (1) {
                let ans = `canvas ${ballNum}个圆 帧率约为 ${Math.round(lastFpsUpdate.toFixed())}`,
                    sel = `.${dadClass} .ans1`
                e(sel).innerText = ans
            }
        };
        ctx.fillStyle = 'cornflowerblue';
        ctx.fillText(lastFpsUpdate.toFixed() + ' fps',20,60);
        window.requestAnimationFrame(animate);
    }
}

//event handlers
animationButton.onclick = function(e){
    paused = paused ? false : true;
    if (paused) {
        animationButton.value = 'Animate';
    }else{
        window.requestAnimationFrame(animate);
        animationButton.value = 'Pause';
    }
}

animationButton.click()
//Initialization
ctx.font = '48px Helvetica';