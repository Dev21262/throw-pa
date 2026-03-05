const canvas = document.getElementById('c');
const ctx = canvas.getContext("2d");

let co = ["#B97376", "#73A4B7", "#72B577", "#B2B270", "#746EAF"];
canvas.width = canvas.height = 600;

ctx.textAlign = "center";

let px = 300; // Paper's Center of Mass's X Coordina
let py = 300; // Paper's Center of Mass's Y Coordinate

let rdx = 0; // Camera's velocity in x
let rdy = 0; // Camera's velocity in y

let dtheta = 15 * (Math.PI / 180);  // Angular Velocity at throw of paper


let mx = 0; //MouseX
let my = 0; //MouseY

let visualTScale = 100; // A scalar. Greater it is lesser the power of throw

 //Resolved Base
 // of Vector joining the paper and da the point where your mouse is at

let base;
let hypotenuse; //Actual Vector
let perpendicular; //Resolved Height of Vector

let menuAnim;
let playAnim;
let scoresAnim;

let rc = () => Math.round(Math.random() * (co.length - 1))

let pa = [
    {
        x: px, 
        y: py,
        z: rc(), //Determines color
        t: 0,
        vx: 0,
        vy: 0,
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

const graphics = {
    bicycle: function(x, y) {
        ctx.fillStyle = "#42484D"
        ctx.fillRect(x, y, 5, 30);
        ctx.fillRect(x - 5, y + 25, 10, 5);
        ctx.fillRect(x, y + 25, 10, 5);
        ctx.fillStyle = "#7C8081";
        ctx.fillRect(x - 6, y + 10, 5, 15);
        ctx.fillRect(x + 6, y + 10, 5, 15);
        ctx.fillStyle = "#5d5e5e";
        ctx.fillRect(x - 5, y + 10, 15, 3);
        ctx.fillRect(x, y + 10, 10, 3);


        ctx.lineWidth = 2;
        ctx.strokeStyle = "#5d5e5e";

        ctx.beginPath();
        ctx.strokeStyle = "#42484";
        // ctx.arc(x, y + 15, 20,  0, Math.PI / 4);
        ctx.moveTo(x + 2.5, y + 30);
        ctx.bezierCurveTo(x + 5, y - 10, x + 40, y + 20, x + 40, y + 15);
        ctx.stroke();
    
        ctx.beginPath();
        ctx.moveTo(x + 2.5, y + 30);
        ctx.bezierCurveTo(x - 5, y - 10, x - 40, y + 20, x - 40, y + 15);
        ctx.stroke();
        // ctx.fill();

        ctx.fillStyle = "#B5B7B9"
        ctx.fillRect(x - 40, y + 15, 10, 5)
        ctx.fillRect(x + 30, y + 15, 10, 5)

        ctx.fillStyle = "#8FC759";
        ctx.fillRect(x, y + 30, 5, 40);
            
        ctx.fillStyle = "#2A2E31";
        ctx.beginPath();
        ctx.moveTo(x + 2, y + 35);
        ctx.bezierCurveTo(x + 8, y + 40, x + 20, y + 50, x + 2, y + 55);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(x + 3, y + 35);
        ctx.bezierCurveTo(x - 2, y + 38, x - 20, y + 50, x + 2, y + 55);
        ctx.fill();

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(x + 20, y + 10);
        ctx.lineTo(x + 50, y + 5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - 20, y + 10);
        ctx.lineTo(x - 50, y + 5);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "#2B2F33"
        ctx.roundRect(x - 5, y - 40, 13, 40, 20);
        ctx.roundRect(x - 5, y + 70, 13, 40, 20);
        ctx.fill();
    },

    p: function(x,y,z,t, scale = 1) {
        ctx.fillStyle = "#EAEDEF";
        ctx.strokeStyle = co[z];

        ctx.lineWidth = 1;
        
        ctx.font = "1.3rem 'Newsreader', serif";
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(t);
        ctx.scale(scale, scale);

        ctx.fillRect(-37, -35, 75, 70);
        ctx.strokeRect(-37, -35, 75, 70);
        ctx.strokeRect(-28, 0, 35, 25);
        
        ctx.fillStyle = co[z];
        ctx.fillText("NEWS", -3, -10);
        ctx.fillRect(-28, -6, 55, 2);
        ctx.fillRect( -28, -0, 15, 15);
        
        ctx.fillRect(12, 0, 10, 6);
        ctx.fillRect(12, 8, 14, 6);
        ctx.fillRect(12, 17, 17, 6);
        
        // ctx.fillStyle="red"; //Center of rotation
        // ctx.fillRect(0, 0, 10, 10); //Center of rotation
        
        ctx.restore();

    }
}

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

const mapEX = [0, 150, 300, 450]; //Initialy of x of elements in the map 
//There are 4 in a row
const mapEY = [-600, -450, -300, -150, 0]; //Initial of elements in the map
//6 exists in a column in a single frame
const camera = {
    x: px,
    y: py,
}

let mapArr = {
    street: [
        {
            x: 100, 
            y: 200, 
        },
        {
            x: 400, 
            y: 300, 
        },
    ], 
    home: [
        {
            x: 0, 
            y: 0, 
            type: 0,
        },
         {
            x: 0, 
            y: 150, 
            type: 1,
        },
         {
            x: 0, 
            y: 300, 
            type: 2,
        },
         {
            x: 0, 
            y: 450, 
            type: 3,
        },
        {
            x: 450, 
            y: 0, 
            type: 0,
        },
         {
            x: 450, 
            y: 150, 
            type: 1,
        },
         {
            x: 450, 
            y: 300, 
            type: 2,
        },
         {
            x: 450, 
            y: 450, 
            type: 3,
        },
    ],
};

function map() {
    let arr = co;

    mapArr.home.forEach((object) => {
        ctx.save();
        ctx.translate(-camera.x, -camera.y);
        ctx.fillStyle = arr[object.type];
        ctx.fillRect(object.x, object.y, 150, 150);
        ctx.restore();
    });
}

function rotatePaper(index) {
    let q = quadrant(index);

    base = (mx - pa[index].x);
    perpendicular = (pa[index].y - my);
    hypotenuse = sqrt(sqr(base) +  sqr(perpendicular)); 
    

    let angle = Math.atan(Math.abs(perpendicular / base)); 
    //Mod of Angle from the nearest x-axis. Either +x or -x 
    // alert(Math.round(angle * 180 / Math.PI));

    //Turns Math.atan 2 would have better and  much more efficient
    //But I am not in the mood to change the code

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
        ctx.fillStyle = "gray";
    } else {
        ctx.fillStyle = co[1];
    }

    //Enemy Type 3
    ctx.beginPath();
    ctx.arc(230, 60, 30, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "#ecf7faff";
    ctx.beginPath();
    ctx.arc(220, 50, 5, 0, Math.PI * 2);
    ctx.arc(240, 50, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillRect(220, 70, 20, 2);
}


window.onmousemove = (e) => {
    mx = e.clientX;
    my = e.clientY;

    for (let a = 0; a < pa.length; a ++) {
        if (pa[a].vx === 0 && pa[a].vy === 0) { 
            rotatePaper(a);
            break;
        }   
    }
};


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

    graphics.p(500, 400, ccc, ccc2);
    graphics.p(500, 420, ccc2, ccc);
    graphics.p(500, 440, ccc3, ccc2);
    graphics.p(500, 450, ccc4, ccc3);

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

function hud() {
    //Actual Papers
    for (let q = pa.length - 1; q >= 0; q--) {
        graphics.p(pa[q].x, pa[q].y, pa[q].z, pa[q].t, 0.85);
    }

    ctx.font = `1rem 'Inter', sans-serif`;
    ctx.fillStyle = "#1d1f20";

    let index;
    // Papper 0 at bottomost
    // Ppaer 1
    // Ppaer 2 
    // Paper 3 Moving
    for (let x = 0; x < pa.length; x++) {
        if (pa[x].vx !== 0 && pa[x].vy !== 0) {
            index = x + 2;
        } else {
            index = x + 1;
            break;
        }
    }

    ctx.fillText("N E X T", canvas.width - 48, canvas.height - 90);
    for (let q = pa.length - 1; q >= index; q--) {
        graphics.p(canvas.width - 50 + q * 2, canvas.height - 60 + q * 5, pa[q].z, 0, 0.7);
    }
    
    //Theowing Power HUD
    if (visualTScale > 90) {
        ctx.fillStyle = "#80CE77";
    } else if (visualTScale > 80) {
        ctx.fillStyle = "#BACC76";
    } else if (visualTScale > 60) {
        ctx.fillStyle = "#CCCC76";
    } else if (visualTScale > 40) {
        ctx.fillStyle = "#CC9E76";
    } else if (visualTScale > 20) {
        ctx.fillStyle = "#CC8D76";
    } else if (visualTScale > 10) {
        ctx.fillStyle = "#CC7676";
    }

    ctx.fillRect(560, 20, 10, 3 * (100 - visualTScale));
}
                          
window.addEventListener("keydown", (e) => {
    if (e.key == " ") {
        if (visualTScale > 20) {
            visualTScale -= 5;
        }
    } else {
        if (e.key === "d") {
            rdx = 15;
        } else if (e.key === "a") {
            rdx = -15;
        }
    
        if (e.key === "w") {
            rdy = -15;
        } else if (e.key === "s") {
            rdy = 15;
        }
    }

    if (e.key === "c") {
        pa.push(pa.shift());
    } else {
        for (let a = 0; a < pa.length; a ++) {
            if (pa[a].vx === 0 && pa[a].vy === 0) { 
                rotatePaper(a);
                break;
            }   
        }
    }
})

window.addEventListener("keyup", (e) => {
    if (e.key == " ") {
        for (let a = 0; a < pa.length; a++) {
            if (pa[a].vx === 0 && pa[a].vy === 0) { 
                pa[a].vx = base / visualTScale;
                pa[a].vy = -perpendicular/ visualTScale; 

                break;
            }   
        }

        hud();
        visualTScale = 100;
    } else {   
        if (e.key == "d" || e.key == "a") {
            rdx = 0;
        }
        
        if (e.key == "w" || e.key == "s") {
            rdy = 0;
        }
    }

    if (pa[0].vx === 0 && pa[0].vy === 0 && e.key !== "c") {
        rotatePaper(0);
    }
});

function game() {
    ctx.clearRect(0,0,600,600);
    canvas.style.background = "white";

    camera.x += rdx;
    camera.y += rdy;

    for (let a = pa.length - 1; a >= 0; a--) {
        if (pa[a].x > 650 || pa[a].x < -50 ||
            pa[a].y > 650 || pa[a].y < -50) {
            pa.splice(a, 1);
        }
    }


    pa.forEach((elem, index) => {
        if (pa[index].vx == 0 && pa[index].vy == 0) {
            // elem.x += rdx;
            // elem.y += rdy;
        }
    });

    // px += rdx;
    // py += rdy;

    for (let a = 0; a < pa.length; a++) {
        pa[a].x += pa[a].vx;
        pa[a].y += pa[a].vy;
        if (pa[a].vx !== 0 && pa[a].vy !== 0) {
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
                    t: Math.random() * 5 ,
                    vx: 0,
                    vy: 0,
                }
            );
        }
    }

    map();
    graphics.bicycle(Math.round(px), Math.round(py));
    hud();
    collision();

    playAnim = window.requestAnimationFrame(game);
}

game();   
// menu();