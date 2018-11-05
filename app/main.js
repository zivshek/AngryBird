
let world;
let environments = [];
let player;
let boxes = [];
let box1;

let timeStep = 1.0/60;
let iteration = 1;

function setup() {
    createCanvas(800, 600);
    world = createWorld();
    environments.push(new Environment(width/2, height - 5, width, 10));
    environments.push(new Environment(width/2, 5, width, 10));
    environments.push(new Environment(5, height/2, 10, height - 20));
    environments.push(new Environment(width - 5, height/2, 10, height - 20));
}

function mousePressed() {
    box1 = createBox(mouseX, mouseY, 15, 15, false);
}

function draw() {
    background(200);
    world.Step(timeStep, iteration);
    environments.forEach(element => {
        element.draw();
    });

    if (box1 != undefined) {
    rectMode(CENTER);
    fill(244);
    stroke(1);
    rect(box1.m_position.x, box1.m_position.y, 15, 15);
    }
}