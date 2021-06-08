
// texture for the particle
let particle_texture = null;

// variable holding our particle system
let ps = null;
let img;
let graphics;

function preload() {
    particle_texture = loadImage("particle2.png");
    img = loadImage('logo.png');
}

function setup() {
    //set the canvas size
    createCanvas(windowWidth, windowHeight);

    //initialize our particle system
    ps = new ParticleSystem(10, createVector(width / 2, (height/2)+60), particle_texture);


}

function draw() {
    background(0);
    // ambientLight(0.1);
    // ambientMaterial(0);
    let dx = map(mouseX, -20, width, -1, 0.9);
    let wind = createVector(dx, -0.5);

    ps.applyForce(wind);
    ps.run();
    for (let i = 0; i < 2; i++) {
        ps.addParticle();
    }



}

function drawLogo(){
    image(img, windowWidth/2, windowHeight/2);

}

let ParticleSystem = function(num, v, img_) {

    this.particles = [];
    this.origin = v.copy(); // we make sure to copy the vector value in case we accidentally mutate the original by accident
    this.img = img_
    for(let i = 0; i < num; ++i){
        this.particles.push(new Particle(this.origin, this.img));
    }
};


ParticleSystem.prototype.run = function() {

    let len = this.particles.length;

    for (let i = len-1; i >= 0; i--) {
        drawLogo();
        let particle = this.particles[i];
        particle.run();

        if (particle.isDead()) {
            this.particles.splice(i, 1);

        }
    }
}

ParticleSystem.prototype.applyForce = function(dir) {
    let len = this.particles.length;
    for(let i = 0; i < len; ++i){
        this.particles[i].applyForce(dir);
    }
}

ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin, this.img));
    drawLogo();
}

let Particle = function (pos, img_) {
    this.loc = pos.copy();

    let vx = randomGaussian() * 0.5;
    let vy = randomGaussian() * 0.3 - 1.0;

    this.vel = createVector(vx, vy);
    this.acc = createVector();
    this.lifespan = 60.0;
    this.texture = img_;
}

Particle.prototype.run = function() {
    this.update();
    this.render();
}

Particle.prototype.render = function() {
    imageMode(CENTER);
    tint(255, this.lifespan);
    image(this.texture, this.loc.x, this.loc.y);
}

Particle.prototype.applyForce = function(f) {
    this.acc.add(f);
}

Particle.prototype.isDead = function () {
    if (this.lifespan <= 0.0) {
        return true;
    } else {
        return false;
    }
}

Particle.prototype.update = function() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.lifespan -= 2.5;
    this.acc.mult(0);
}
