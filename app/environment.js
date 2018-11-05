
class Environment {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.body = createBox(this.x, this.y, this.w, this.h, true);

    }

    draw() {
        rectMode(CENTER);
        fill(100);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }
}