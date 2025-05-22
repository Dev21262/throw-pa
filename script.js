let canvas = document.querySelector("#c");
let ctx = canvas.getContext("2d");

let co = ["#A50600", "#92A300", "#00A073", "#56009E", "#9B4800"];
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
    
    ctx.font = "1.5rem 'DM Serif Display', serif";
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
        ctx.fillStyle = "green";
    } else if (throwScale > 80) {
        ctx.fillStyle = "yellowgreen";
    } else if (throwScale > 60) {
        ctx.fillStyle = "yellow";
    } else if (throwScale > 40) {
        ctx.fillStyle = "orange";
    } else if (throwScale > 20) {
        ctx.fillStyle = "orangered";
    } else if (throwScale > 10) {
        ctx.fillStyle = "red";
    }
    ctx.fillRect(530, 250, 10, 3 * (100 - throwScale));
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
        dx = base/ throwScale;
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

    pa[0].x += dx;
    pa[0].y += dy;
    pa[0].t += dtheta;


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
