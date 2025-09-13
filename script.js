let canvas = document.querySelector("#c");
let ctx = canvas.getContext("2d");

let co = ["#B97376", "#73A4B7", "#72B577", "#B2B270", "#746EAF"];
canvas.width = canvas.height = 600;

ctx.textAlign = "center";

let px = 300; // Paper's Center of Mass's X Coordina
// e
let py = 300; // Paper's Center of Mass's Y Coordinate

let dy = [0, 0, 0, 0, 0]; // Y Velocity of first paper 
let dx = [0, 0, 0, 0, 0]; // X Velocity of first paper
let rdx = 0; // Y Velocity of all other papers
let rdy = 0; // X Velocity of all other papers
let dtheta = 15 * (Math.PI / 180);  // Angular Velocity at throw of paper


let mx = 0; //MouseX
let my = 0; //MouseY

let throwScale = 100; // A scalar

let base; //Resolved Base of Vector
let hypotenuse; //Actual Vector
let perpendicular; //Resolved Height of Vector

let paperIndex = 0; //Current Paper index

let menuAnim;
let playAnim;
let scoresAnim;

let rc = () => Math.round(Math.random() * (co.length - 1))


let pa = [
    {
        x: px, 
        y: py,
        z: rc(), //Determines color
        t: 0
    }
];

const mod = (para) => Math.abs(para);
const sqrt = (para) => Math.sqrt(para);
const sqr =  (para) => para ** 2;

const ifHovering = {
    PlAY: false,
    HOW: false,
    SCORES: false
};

document.onclick = function () {
    for (let props in ifHovering) {
        if (ifHovering[props]) {
            cancelAnimationFrame(menuAnim);
            cancelAnimationFrame(scoresAnim);
            cancelAnimationFrame(playAnim);

            if (props === "P L A Y") {
                playAnim = requestAnimationFrame(game);
            }
        }
    }
}

class Button {
    constructor(x, y, w, h, txt, name, size, color, hoverColor) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.txt = txt;
        this.name = name;
        this.size = size;
        this.color = color;
        this.hoverColor = hoverColor;
    }

    draw() {
        let { x, y, w, h, txt, name, size, color, hoverColor } = this;
        
        let fillColor = color;
        
        if (mx > x && my > y - h
            && mx < x + w && my < y + h) {
            fillColor = hoverColor;
            ifHovering[txt] = true;
        } else {
            fillColor = color;
            ifHovering[txt] = false;
        }

        // ctx.fillStyle = "red";
        // ctx.fillRect(x, y - h, w, h);
        ctx.textAlign = "left";
        ctx.fillStyle = fillColor;
        ctx.font = `${size}rem 'Inter', sans-serif`;
        ctx.fillText(txt, x, y);
    }   
}

const PLAYBTN = new Button(272, 295, 100, 30, "P L A Y", "PLAY", 2, "#444444", "#000000")
const HOWBTN = new Button(272, 345, 90, 30, "H O W", 2, "HOW", "#444444", "#000000")
const SCORES = new Button(240, 395, 155, 30, "S C O R E S", 2, "SCORES", "#444444", "#000000")

function quadrant(indice) {
    if (mx > pa[indice].x && my < pa[indice].y) {
        return "First";
    } else if (mx > pa[indice].x && my > pa[indice].y) {
        return "Fourth";
    } else if (mx < pa[indice].x && my < pa[indice].y) {
        return "Second";
    } else if (mx < pa[indice].x && my > pa[indice].y) {
        return "Third";
    }
}

function rotatePaper(index) {
    let q = quadrant(index);

    hypotenuse = sqrt(sqr(mx - pa[index].x) +  sqr(my - pa[index].y)); 
    perpendicular = (pa[index].y - my);
    base = (mx - pa[index].x);
    

    let angle = Math.atan(Math.abs(perpendicular / base)); 
    //Mod of Angle from the nearest x-axis. Either +x or -x 
    // alert(Math.round(angle * 180 / Math.PI));

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

let rand = rc();

function collision() {
    //Dimensions of Paper:  90 pixels wide, 80 pixels high
    const {x, y, w, h} = {
        x: pa[0].x - 52,
        y:  pa[0].y - 52,
        w: 90,
        h: 90,
    }
    
    
    // ctx.strokeRect(x, y, w, h);
    
    if (250 > x && 250 < x + w &&
        50 > y && 50 < y + h 
    ) {
        ctx.fillStyle = "red";
    }
    
    ctx.fillStyle = '#ecf7faff';
    ctx.fillRect(230, 60, 50, 80);
    ctx.fillStyle = '#72B577';
    ctx.fillRect(230, 60, 50, 70);

    ctx.fillStyle = "#ecf7faff";
    ctx.beginPath();
    ctx.arc(245, 90, 5, 0, Math.PI * 2);
    ctx.arc(265, 90, 5, 0, Math.PI * 2);
    ctx.fill();
}


window.onmousemove = (e) => {
    mx = e.clientX;
    my = e.clientY;

    for (let a = 0; a < pa.length; a ++) {
        if (dx[a] === 0 && dy[a] === 0) { 
            rotatePaper(a);
            break;
        }   
    }
};

function p(x,y,z,t) {
    ctx.fillStyle = "#EAEDEF";
    ctx.strokeStyle = co[z];
    
    ctx.font = "1.3rem 'Newsreader', serif";
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(t);

    ctx.fillRect(-33, -35, 75, 70);
    ctx.strokeRect(-33, -35, 75, 70);
    ctx.strokeRect(-25, 0, 35, 25);
    
    ctx.fillStyle = co[z];
    ctx.fillText("NEWS", 0, -10);
    ctx.fillRect(-25, -8, 55, 2);
    ctx.fillRect( -25, -0, 15, 15);
    
    ctx.fillRect(15, 0, 10, 6);
    ctx.fillRect(15, 8, 14, 6);
    ctx.fillRect(15, 17, 17, 6);
    
    // ctx.fillStyle="red"; //Center of rotation
    // ctx.fillRect(0, 0, 10, 10); //Center of rotation
    
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
    
    menuAnim = requestAnimationFrame(menu);
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
    } else {
        if (e.key == "d") {
            rdx = 15;
        } else if (e.key == "a") {
            rdx = -15;
        }
    
        if (e.key == "w") {
            rdy = -15
        } else if (e.key == "s") {
            rdy = 15;
        }
    }

    for (let a = 0; a < pa.length; a ++) {
        if (dx[a] === 0 && dy[a] === 0) { 
            rotatePaper(a);
            break;
        }   
    }
})

window.addEventListener("keyup", (e) => {
    if (e.key == " ") {
        for (let a = 0; a < pa.length; a ++) {
            if (dx[a] === 0 && dy[a] === 0) { 
                dx[a] = base / throwScale;
                dy[a] = -perpendicular/ throwScale; 

                break;
            }   
        }

        i();
        throwScale = 100;
    } else {   
        if (e.key == "d" || e.key == "a") {
            rdx = 0;
        }
        
        if (e.key == "w" || e.key == "s") {
            rdy = 0;
        }
    }
    if (dx[0] === 0 && dy[0] === 0) {
        rotatePaper(0);
    }
});

function game() {
    for (let a = 0; a < pa.length; a ++) {
        if (pa[a].x > 650 || pa[a].x < -50 ||
            pa[a].y > 650 || pa[a].y < -50 
        ) {
            pa.splice(a, 1);
            for (let b = a; b < pa.length; b++) {
                if (dx[b] !== 0 && dy[b] !== 0 ) {
                    dx[b] = dx[b + 1];
                    dy[b] = dy[b + 1];
                } 
            }
        }
    }


    pa.forEach((elem, index) => {
        if (dx[index] == 0 && dy[index] == 0) {
            elem.x += rdx;
            elem.y += rdy;
        }
    });

    px += rdx;
    py += rdy;

    for (let a = 0; a < pa.length; a++) {
        pa[a].x += dx[a];
        pa[a].y += dy[a];
        if (dx[a] !== 0 && dy[a] !== 0) {
            pa[a].t += dtheta;
        }
    }

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
            console.log(px);
            console.log(py);
        }
    }


    i();
    collision();

    playAnim = window.requestAnimationFrame(game);
}

game();                                                
// menu();