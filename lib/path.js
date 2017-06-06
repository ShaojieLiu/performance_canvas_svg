/**
 * Created by liushaojie on 2017/6/5.
 */

let svgPath = () => {
    let svg = e('#svg9');
    let ball = count => `
        <circle cx="0" cy="0" r="20" stroke=#${Math.floor(Math.random() * (2 << 23)).toString(16)} stroke-width="2" fill="transparent">
            <animateMotion class="path" path="M150,20 L280,75 L150,130 L20,75 L150,20" begin="${0.001 * count}s" dur="${3 - 0.001 * count}s" repeatCount="indefinite"/>
        </circle>
    `;

    let balls = count => {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(i);
        }
        return result.map(ball).join('');
    };

    // let ballNum = 2000
    svg.insertAdjacentHTML('beforeend', balls(ballNum));

    let paused = true;

    let bind = () => {
        e('#svgButton').addEventListener('click', () => {
            let svg = e('#svg9');
            let ele = e('.path');
            let eles = document.querySelectorAll('.path'
            // log('click', ele, ele.animationsPaused)

            );if (paused) {
                svg.unpauseAnimations();
                window.requestAnimationFrame(ani);
            } else {
                svg.pauseAnimations();
            }
            paused = !paused;
        });
    };
    svg.pauseAnimations();

    function ani(time) {
        if (!paused) {
            let fps = 0;
            if (time == undefined) {
                time = +new Date(); //+new Date()是一个东西;  +相当于.valueOf();
            };
            if (1) {

                var now = +new Date();
                //console.log(now);
                fps = calculateFps();

                if (now - lastFpsUpdateTime > 1000) {
                    lastFpsUpdateTime = now;
                    lastFpsUpdate = fps;

                    if (1) {
                        let ans = `svg ${ballNum}个圆 帧率约为 ${Math.round(lastFpsUpdate)}`,
                            sel = `.${dadClass} .ans2`;
                        e(sel).innerText = ans;
                    }
                };
                window.requestAnimationFrame(ani);
            }
        }
    }

    // let frame = () => {
    //     setInterval(() => {
    //         let f = window.requestAnimationFrame(e('#svg9'))
    //         let ans = `svg ${ballNum}个圆 帧率约为 ${Math.round(f)}`,
    //             sel = `.${dadClass} .ans2`
    //         e(sel).innerText = ans
    //     }, 1000)
    // }
    //
    // frame()
    window.requestAnimationFrame(ani);
    bind();
};
svgPath();