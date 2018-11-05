function createWorld() {
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-1000, -1000);
    worldAABB.maxVertex.Set(1000, 1000);
    var gravity = new b2Vec2(0, 300);
    var doSleep = true;
    var world = new b2World(worldAABB, gravity, doSleep); 
    return world;
}

function createBox(x, y, w, h, static) {
    var boxShapeDef = new b2BoxDef();
    boxShapeDef.extents.Set(w, h);
    if (static) boxShapeDef.density = 0;
    else boxShapeDef.density = 1.0;
    var boxBodyDef = new b2BodyDef();
    boxBodyDef.AddShape(boxShapeDef);
    boxBodyDef.position.Set(x, y);
    return world.CreateBody(boxBodyDef);
}