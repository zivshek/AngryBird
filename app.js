var ball;
var scale = 30;
var mouseJoint = null;

function setup() {
    createCanvas(800, 600);
    frameRate(60);

    b2newWorld(scale, createVector(0, 9.8));
    ball = shape('circle', 15, 15, 40, 40);
    ball.density = 20;
    ball.bounce = 1;
    base(5, 5);
    pyramid(10, width / 2, 15, 16, 16);
}

function draw() {
    background(227);
    b2Update();
    b2Draw(false);
}

function mousePressed() {
    var p = new b2Vec2(mouseX/scale, mouseY/scale);
    p.y = height - p.y;
    if (!mouseJoint) {
        var body = b2GetBodyAt(p.x, p.y);
        if (body) {
            var def = new b2MouseJointDef();
                 
            def.bodyA = ground;
            def.bodyB = body;
            def.target = p;

            def.collideConnected = true;
            def.maxForce = 1000 * body.GetMass();
            def.dampingRatio = 0;

            mouseJoint = world.CreateJoint(def);

            body.SetAwake(true);
        }
    }
}

function mouseDragged() {
    if (mouseJoint) {
        var p = new b2Vec2(mouseX/scale, mouseY/scale);
        p.y = height - p.y;
        mouseJoint.setTarget(p);
    }
}

function base(margin, thickness) {
    var wallBottom = new b2Body('box', false, createVector(width / 2, height - margin - thickness / 2), createVector(width - 2 * margin, thickness));
    //var wallTop = new b2Body('box', false, createVector(width / 2, margin + thickness / 2), createVector(width - 2 * margin, thickness));
    var wallRight = new b2Body('box', false, createVector(width - margin - thickness / 2, height / 2), createVector(thickness, height - 2 * margin));
    var wallLeft = new b2Body('box', false, createVector(margin + thickness / 2, height / 2), createVector(thickness, height - 2 * margin));
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
            b.bounce = 1;
            _xy.x += wh.x / 2 + wh.x;
            i++;
        }
        n--;
        xy.x += wh.x / 2 + wh.x / 4;
        xy.y -= wh.y * 3 / 2;
    }
}
