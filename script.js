let canvas = document.querySelector("#c");
let ctx = canvas.getContext("2d");

let co = ["#B97376", "#73A4B7", "#72B577", "#B2B270", "#746EAF"];
canvas.width = canvas.height = 600;

ctx.textAlign = "center";

let px = 300;
let py = 300;

let dy = 0;
let dx = 0;
let dtheta = 0; 

let mx = 0;
let my = 0;

let throwScale = 100;

let base;
let hypotenuse;
let perpendicular;

let paperIndex = 0;


let rc = () => Math.round(Math.random() * (co.length - 1))


let pa = [
    {
        x: px, 
        y: py,
        z: rc(),
        t: 0
    }
];

const mod = (para) => Math.abs(para);
const sqrt = (para) => Math.sqrt(para);
const sqr =  (para) => para ** 2;


class Button {
    constructor(x, y, w, h, txt, size, color, hoverColor) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.txt = txt;
        this.size = size;
        this.color = color;
        this.hoverColor = hoverColor;
    }

    draw() {
        let { x, y, w, h, txt, size, color, hoverColor } = this;
        
        let fillColor = color;
        
        if (mx > x && my > y - h
            && mx < x + w && my < y + h) {
            fillColor = hoverColor;
        } else {
            console.log(mx);
            fillColor = color;
        }

        // ctx.fillStyle = "red";
        // ctx.fillRect(x, y - h, w, h);
        ctx.textAlign = "left";
        ctx.fillStyle = fillColor;
        ctx.font = `${size}rem 'Inter', sans-serif`;
        ctx.fillText(txt, x, y);
    }   
}

const PLAYBTN = new Button(272, 295, 100, 30, "P L A Y", 2, "#444444", "#000000")
const HOWBTN = new Button(272, 345, 90, 30, "H O W", 2,  "#444444", "#000000")
const SCORES = new Button(240, 395, 155, 30, "S C O R E S", 2, "#444444", "#000000")

function quadrant() {
    if (mx > 300 && my < 300) {
        return "First";
    } else if (mx > 300 && my > 300) {
        return "Fourth";
    } else if (mx < 300 && my < 300) {
        return "Second";
    } else if (mx < 300 && my > 300) {
        return "Third";
    }
}

function rotatePaper(index) {
    let q = quadrant();

    hypotenuse = sqrt(sqr(mx - pa[index].x) +  sqr(my - pa[index].y)); 
    perpendicular = (pa[index].y - my);
    base = (mx - pa[index].x);
    

    let angle = Math.atan(Math.abs(perpendicular / base)); 

    if (q === "First") {
        pa[index].t = (Math.PI / 2) - (angle);
        
    } else if (q === "Fourth") {
        pa[index].t = (Math.PI / 2) + (angle);

    } else if (q === "Third") {
        pa[index].t = (Math.PI) + (Math.PI / 2) - (angle);

    } else if (q === "Second") {
        pa[index].t = (Math.PI) + (Math.PI / 2) + (angle);
    }
}


window.onmousemove = (e) => {
    mx = e.clientX;
    my = e.clientY;

    if (dx === 0 && dy === 0) { 
        rotatePaper(0);
    } else {
        rotatePaper(1);
    } 

    // console.log(Math.round(pa[0].t * (180 / Math.PI)));
    // console.log(perprendicular);
};

function p(x,y,z,t) {
    ctx.fillStyle = "#EAEDEF";
    ctx.strokeStyle = co[z];
    
    ctx.font = "1.5rem 'Newsreader', serif";
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(t);
    ctx.fillRect(-45, -40, 90, 80);
    ctx.strokeRect(-45, -40, 90, 80);
    ctx.strokeRect(-35, -5, 45, 35);
    
    ctx.fillStyle = co[z];
    ctx.fillText("NEWS", -8, -15);
    ctx.fillRect(-35, -12, 65, 2);
    ctx.fillRect(-35, -5, 15, 20);
    
    ctx.fillRect(15, -5, 12, 10);
    ctx.fillRect(15, 7, 17, 10);
    ctx.fillRect(15, 19, 22, 10);
    ctx.restore();
}
    
let ccc = rc();
let ccc2 = rc();
let ccc3 = rc();
let ccc4 = rc();


function menu() {
    ctx.clearRect(0,0,600,600);    

    for (let xa = 0; xa < 600; xa += 35) {
        for (let ya = 0; ya < 600; ya += 35) {
            ctx.fillStyle = co[ccc2];
            ctx.fillRect(xa, ya, 2, 3);
        }
    }

    ctx.fillStyle = co[ccc];
    ctx.font = "5rem 'Major Mono Display', monospace";
    ctx.fillText("THROW", 445, 155);
    ctx.fillStyle = co[ccc2];
    ctx.fillText("PA", 515, 225);

    PLAYBTN.draw();
    HOWBTN.draw();
    SCORES.draw();

    ctx.textAlign = "center";
    ctx.fillStyle = "#444444";
    ctx.font = "1.25rem 'Inter', sans-serif";
    ctx.fillText("MADE BY ", 70, 580);
    ctx.fillStyle = co[ccc2];
    ctx.font = "1.25rem 'Inter', sans-serif";
    ctx.strokeStyle = co[ccc];
    ctx.strokeText("2 1 2 6 2", 150, 579);

    // ctx.lineWidth = 1;

    p(500, 400, ccc, ccc2);
    p(500, 420, ccc2, ccc);
    p(500, 440, ccc3, ccc2);
    p(500, 450, ccc4, ccc3);

    ctx.strokeStyle = co[ccc2];
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(100, 0);
    ctx.stroke();

    ctx.strokeStyle = co[ccc3];
    ctx.beginPath();
    ctx.moveTo(0, 60);
    ctx.lineTo(110, 0);
    ctx.stroke();

    ctx.strokeStyle = co[ccc4];
    ctx.beginPath();
    ctx.moveTo(0, 70);
    ctx.lineTo(120, 0);
    ctx.stroke();

    requestAnimationFrame(menu);
}

function i() {
    ctx.clearRect(0,0,600,600);

    for (let q = pa.length - 1; q >= 0; q--) {
        p(pa[q].x, pa[q].y, pa[q].z, pa[q].t);
    }

    // const gradient = ctx.createLinearGradient(530, 250, 540, 250 + 3 * (100 - throwScale));
    // gradient.addColorStop(0.3, "green");
    // gradient.addColorStop(0.5, "yellowgreen");
    // gradient.addColorStop(0.7, "yellow");
    // gradient.addColorStop(0.9, "orange");
    // gradient.addColorStop(1, "red ");

    if (throwScale > 90) {
        ctx.fillStyle = "#80CE77";
    } else if (throwScale > 80) {
        ctx.fillStyle = "#BACC76";
    } else if (throwScale > 60) {
        ctx.fillStyle = "#CCCC76";
    } else if (throwScale > 40) {
        ctx.fillStyle = "#CC9E76";
    } else if (throwScale > 20) {
        ctx.fillStyle = "#CC8D76";
    } else if (throwScale > 10) {
        ctx.fillStyle = "#CC7676";
    }
    ctx.fillRect(560, 20, 10, 3 * (100 - throwScale));
}
                          
window.addEventListener("keydown", (e) => {
    if (e.key == " ") {
        if (throwScale > 20) {
            throwScale -= 5;
        }
    } 
})
 

window.addEventListener("keyup", (e) => {
    if (e.key == " ") {
        dx = base / throwScale;
        dy = -perpendicular/ throwScale; 
        dtheta = 15 * (Math.PI / 180); 

        i();
        throwScale = 100;

    }
});

function g() {    
    if (pa[0].x > 650 || pa[0].x < -50 ||
        pa[0].y > 650 || pa[0].y < -50 
    ) {
        dx = 0;
        dy = 0;
        dtheta = 0;
        pa.shift();
    }

    pa[paperIndex].x += dx;
    pa[paperIndex].y += dy;
    pa[paperIndex].t += dtheta;



    if (pa.length < 5){ 
        for (let x = px; x < px + 1; x++) {
            pa.push(
                {
                    x, 
                    y: py,
                    z: rc(),
                    t: Math.random() * 5 
                }
            );
        }
    }

    i();

    window.requestAnimationFrame(g);
}

g();
// menu();