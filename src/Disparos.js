 var DisparoHielo = cc.Class.extend({
    space:null,
    sprite:null,
    body:null,
    shape:null,
    layer:null,
ctor:function (space, posicion, layer) {
    this.space = space;
    this.layer = layer;


    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 3; i++) {
        var str = "ShootHielo_" + i + ".png";
        console.log(str);
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    var actionAnimacionBucle =
        new cc.RepeatForever(new cc.Animate(animacion));

    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#ShootHielo_1.png");
    // Cuerpo estática , no le afectan las fuerzas
    this.body = new cp.Body(5, Infinity);

    this.body.setPos(posicion);
    this.body.setAngle(0);
    this.sprite.setBody(this.body);
    // Se añade el cuerpo al espacio
    this.space.addBody(this.body);

    // forma
    this.shape = new cp.BoxShape(this.body,
        this.sprite.getContentSize().width,
        this.sprite.getContentSize().height);
    // agregar forma dinamica
    this.shape.setSensor(true);
    this.space.addShape(this.shape);
    this.shape.setCollisionType(tipoDisparoHielo);
    // añadir sprite a la capa

    // ejecutar la animación
    this.sprite.runAction(actionAnimacionBucle);

    layer.addChild(this.sprite,10);


   }, eliminar: function (){
        // quita la forma
        this.space.removeShape(this.shape);

        // quita el cuerpo
        this.space.removeBody(this.shape.getBody());

        // quita el sprite
        this.layer.removeChild(this.sprite);
    }
});

var DisparoFuego = cc.Class.extend({
    space:null,
    sprite:null,
    body:null,
    shape:null,
    layer:null,
    tiempoVida:30,
ctor:function (space, posicion, layer) {
    this.space = space;
    this.layer = layer;


    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 11; i++) {
        var str = "ShootFire_" + i + ".png";
        console.log(str);
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.1);
    var actionAnimacionBucle =
        new cc.RepeatForever(new cc.Animate(animacion));

    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#ShootFire_1.png");
    // Cuerpo estática , no le afectan las fuerzas
    this.body = new cp.Body(0.15, Infinity);

    this.body.setPos(posicion);
    this.body.setAngle(0);
    this.sprite.setBody(this.body);
    // Se añade el cuerpo al espacio
    this.space.addBody(this.body);

    // forma
    this.shape = new cp.BoxShape(this.body,
        this.sprite.getContentSize().width,
        this.sprite.getContentSize().height);
    // agregar forma dinamica
    this.shape.setSensor(true);
    this.space.addShape(this.shape);
    this.shape.setCollisionType(tipoDisparoFuego);
    // añadir sprite a la capa

    // ejecutar la animación
    this.sprite.runAction(actionAnimacionBucle);

    layer.addChild(this.sprite,10);


   }, eliminar: function (){
        // quita la forma
        this.space.removeShape(this.shape);

        // quita el cuerpo
        this.space.removeBody(this.shape.getBody());

        // quita el sprite
        this.layer.removeChild(this.sprite);
    }
});

var DisparoAire = cc.Class.extend({
    space:null,
    sprite:null,
    body:null,
    shape:null,
    layer:null,
ctor:function (space, posicion, layer) {
    this.space = space;
    this.layer = layer;


    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 8; i++) {
        var str = "ShootWind_" + i + ".png";
        console.log(str);
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.1);
    var actionAnimacionBucle =
        new cc.RepeatForever(new cc.Animate(animacion));

    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#ShootWind_1.png");
    // Cuerpo estática , no le afectan las fuerzas
    this.body = new cp.Body(0.15, Infinity);

    this.body.setPos(posicion);
    this.body.setAngle(0);
    this.sprite.setBody(this.body);
    // Se añade el cuerpo al espacio
    this.space.addBody(this.body);

    // forma
    this.shape = new cp.BoxShape(this.body,
        this.sprite.getContentSize().width,
        this.sprite.getContentSize().height);
    // agregar forma dinamica
    this.shape.setSensor(true);
    this.space.addShape(this.shape);
    this.shape.setCollisionType(tipoDisparoAire);
    // añadir sprite a la capa

    // ejecutar la animación
    this.sprite.runAction(actionAnimacionBucle);

    layer.addChild(this.sprite,10);


   }, eliminar: function (){
        // quita la forma
        this.space.removeShape(this.shape);

        // quita el cuerpo
        this.space.removeBody(this.shape.getBody());

        // quita el sprite
        this.layer.removeChild(this.sprite);
    }
});