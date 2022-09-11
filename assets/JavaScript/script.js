//Set Up
const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const mid = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mid.x = canvas.width / 2;
    mid.y = canvas.height / 2;
    init();
});

//Code
class Wave {
    constructor(period = 1, amplitude = 1, offset = 0) {
        //Period is how long each section of a cycle is
        //Amplitude is how high and low the peaks and valleys are
        //Offset is where you start along the function
        //The angle is how you cycle through the different aplitudes, periods, and offsets to get cool effects
        this.p = period;
        this.amp = amplitude;
        this.off = offset;
        let angle = 0;

        this.update = function() {
            //Each variable is passed through the draw function with the repective values being cycled through a sine function based on the starting input
            let p = this.p + Math.sin(angle) * this.p / 2;
            let a = this.amp + Math.sin(angle * 2) * this.amp / 2;
            let o = this.off + Math.sin(angle / 2) * this.off / 2;
            angle += Math.PI / 360;

            this.draw(p, a, o);
        }

        this.draw = function(p, a, o) {
            c.beginPath();
            c.strokeStyle = 'white';
            c.moveTo(0, mid.y + Math.sin((0 + o) * p) * a);
            //Uses a loop to draw a line accross the the width of the screen using all the parameters updated from the update function
            for (let i = 0; i < canvas.width; i += Math.PI / 180) {
                let y = Math.sin((i + o) * p) * a;
                c.lineTo(i, y + mid.y);
            }
            c.stroke();
            c.closePath();
        }
    }
}

const wave = new Wave(0.001, mid.y / 2, 5000);

//A way to reset after something such as a resize
function init() {
    wave.draw();
}

//Function that animates the wave
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    wave.update();
    requestAnimationFrame(animate);
}

animate();