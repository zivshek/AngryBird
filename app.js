function setup() {
    createCanvas(800, 600);

    b2newWorld(30, createVector(0, 9.8));
    base(width / 2, height - 2, width, 5);
    pyramid(5, width * 3 / 4, height - 10, 16, 32);
}

function draw() {
    background(227);
    b2Update();
    b2Draw(false);
}

function mousePressed() {
    var b = shape('circle', 5, height - 8, 20, 20);
    b.density = 20;
    b.applyForce(createVector(1, (height - mouseY) / height * 2), 300);
}

function base(x, y, w, h) {
    return new b2Body('box', false, createVector(x, y), createVector(w, h));
}

function shape(type, x, y, w, h) {
    return new b2Body(type, true, createVector(x || width / 2, y || 0), createVector(w || 20, h ||
        20));
}

function pyramid(n, x, y, w, h) {
    // Build a pyramid with an n-can base
    var xy = createVector(x, y);
    var wh = createVector(w, h);
    while (n > 0) {
        var i = 0;
        var _xy = xy.copy();
        while (i < n) {
            var b = shape('box', _xy.x, _xy.y, wh.x, wh.y);
            b.density = 5;
            _xy.x += wh.x / 2 + wh.x;
            i++;
        }
        n--;
        xy.x += wh.x / 2 + wh.x / 4;
        xy.y -= wh.y * 3 / 2;
    }
}
