/**
 * Created by liushaojie on 2017/6/5.
 */

let template = (name, dadClass, num, diy) => `
    <span>${name}</span>
    ${diy || '<span></span>'}
    <div class="dad ${dadClass}">
        
        <div class="son">
            <span class="ans1">canvas{{result}}</span>
            <canvas class="grandson" id='canvas${num}'></canvas>
        </div>
        
        <div class="son">
            <span class="ans2">svg{{result}}</span>
            <svg class="grandson" id='svg${num}'></svg>
        </div>
    </div>`

let insert = (...args) => {
    let t = template(...args)
    e('.main').insertAdjacentHTML('beforeend', t)
}

// insert('绘制9999个矩形de用时', 'game1', 1)

