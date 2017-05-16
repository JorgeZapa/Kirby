var quieto = "quieto";
var correr = "correr";
var saltar = "saltar";
var disparando = "disparando";
var flotar = "flotar";

var normal = 0;
var hielo = 1;
var fuego = 2;
var aire = 3;

var cteTiempoInvencibilidad=70;
var cteTiempoFlotar=20;
var cteTiempoDano= 15;

var Jugador = cc.Class.extend({
    contadorVelYCero: 0,
    estado: quieto,
    forma: normal,
    tiempoDisparando: 0,
    animacionDisparar:null,
    animacionesDisparar:[],
    animacionQuieto:null,
    animacionesQuieto:[],
    animacionCorrer:null,
    animacionesCorrer:[],
    animacionSaltar:null,
    animacionesSaltar:[],
    animacionFlotar:null,
    animacionesFlotar:[],
    tiempoFlotar:cteTiempoFlotar,
    animacionDano:null,
    tiempoDano:0,
    tocarSuelo:0, //0 true 1 false
    lastChangedState: saltar,
    invencibilidad:false,
    tiempoInvencible:cteTiempoInvencibilidad,
    space:null,
    sprite:null,
    shape:null,
    body:null,
    layer:null,

ctor:function (space, posicion, layer) {
    this.space = space;
    this.layer = layer;

    // animaciones - correr
    //normal
    var framesAnimacion = [];
    for (var i = 1; i <= 10; i++) {
        var str = "walkNormal_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionCorrer = new cc.RepeatForever(new cc.Animate(animacion));
    this.animacionesCorrer[normal]=new cc.RepeatForever(new cc.Animate(animacion));
    //Hielo
    var framesAnimacion = [];
        for (var i = 1; i <= 10; i++) {
            var str = "walkHielo_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        var animacion = new cc.Animation(framesAnimacion, 0.2);
        this.animacionesCorrer[hielo]=new cc.RepeatForever(new cc.Animate(animacion));
    //Fuego
    var framesAnimacion = [];
    for (var i = 1; i <= 20; i++) {
        var str = "walkFuego_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.05);
    this.animacionesCorrer[fuego]=new cc.RepeatForever(new cc.Animate(animacion));

    //Aire
    var framesAnimacion = [];
    for (var i = 1; i <= 20; i++) {
        var str = "walkAire_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.1);
    this.animacionesCorrer[aire]=new cc.RepeatForever(new cc.Animate(animacion));

    //this.animacionCorrer.retain();

    // animaciones - saltar
    // normal
    var framesAnimacion = [];
    for (var i = 1; i <= 9; i++) {
        var str = "jumpNormal_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionSaltar = new cc.RepeatForever(new cc.Animate(animacion));
    this.animacionesSaltar[normal] = new cc.RepeatForever(new cc.Animate(animacion));

    // hielo
    var framesAnimacion = [];
    for (var i = 1; i <= 9; i++) {
        var str = "jumpHielo_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionesSaltar[hielo] = new cc.RepeatForever(new cc.Animate(animacion));

    //fuego
    var framesAnimacion = [];
    for (var i = 1; i <= 10; i++) {
        var str = "jumpFuego_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionesSaltar[fuego] = new cc.RepeatForever(new cc.Animate(animacion));

    //aire
    var framesAnimacion = [];
    for (var i = 1; i <= 10; i++) {
        var str = "jumpAire_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionesSaltar[aire] = new cc.RepeatForever(new cc.Animate(animacion));

    // animaciones - flotar
    // normal
    var framesAnimacion = [];
    for (var i = 1; i <= 6; i++) {
        var str = "flotarNormal_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionFlotar = new cc.RepeatForever(new cc.Animate(animacion));
    this.animacionesFlotar[normal] = new cc.RepeatForever(new cc.Animate(animacion));

    // hielo
    var framesAnimacion = [];
    for (var i = 1; i <= 7; i++) {
        var str = "flotarHielo_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionesFlotar[hielo] = new cc.RepeatForever(new cc.Animate(animacion));

    // fuego
    var framesAnimacion = [];
    for (var i = 1; i <= 15; i++) {
        var str = "flotarFuego_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.1);
    this.animacionesFlotar[fuego] = new cc.RepeatForever(new cc.Animate(animacion));

    // aire
    var framesAnimacion = [];
    for (var i = 1; i <= 20; i++) {
        var str = "flotarAire_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.1);
    this.animacionesFlotar[aire] = new cc.RepeatForever(new cc.Animate(animacion));

    //impactado
    //solo normal.
     var framesAnimacion = [];
        for (var i = 1; i <= 4; i++) {
            var str = "impactado_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        var animacion = new cc.Animation(framesAnimacion, 0.2);
        this.animacionDano = new cc.RepeatForever(new cc.Animate(animacion));

    // animaciones - quieto
    var framesAnimacion = [];
    for (var i = 1; i <= 2; i++) {
        var str = "IdleNormal_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionQuieto = new cc.RepeatForever(new cc.Animate(animacion));
    this.animacionesQuieto[normal] = new cc.RepeatForever(new cc.Animate(animacion));

    // hielo
    var framesAnimacion = [];
    for (var i = 1; i <= 2; i++) {
        var str = "IdleHielo_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionesQuieto[hielo] = new cc.RepeatForever(new cc.Animate(animacion));

    // fuego
    var framesAnimacion = [];
    for (var i = 1; i <= 8; i++) {
        var str = "IdleFuego_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.05);
    this.animacionesQuieto[fuego] = new cc.RepeatForever(new cc.Animate(animacion));

    // aire
    var framesAnimacion = [];
    for (var i = 1; i <= 8; i++) {
        var str = "IdleAire_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.05);
    this.animacionesQuieto[aire] = new cc.RepeatForever(new cc.Animate(animacion));

    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 2; i++) {
        var str = "IdleNormal_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    var actionAnimacionBucle =
        new cc.RepeatForever(new cc.Animate(animacion));


    // Crear animación - disparar
    //Hielo
    var framesAnimacion = [];
    for (var i = 1; i <= 4; i++) {
        var str = "dispararHielo_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    this.animacionDisparar =
        new cc.Repeat(new cc.Animate(animacion),1);
    this.animacionesDisparar[hielo] = new cc.RepeatForever(new cc.Animate(animacion));

    //fuego
    var framesAnimacion = [];
    for (var i = 1; i <= 6; i++) {
        var str = "dispararFuego_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.15);
    this.animacionesDisparar[fuego] = new cc.RepeatForever(new cc.Animate(animacion));

    //aire
    var framesAnimacion = [];
    for (var i = 1; i <= 2; i++) {
        var str = "dispararAire_" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.15);
    this.animacionesDisparar[aire] = new cc.RepeatForever(new cc.Animate(animacion));


    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#IdleNormal_1.png");
    // Cuerpo dinamico, SI le afectan las fuerzas


    this.body = new cp.Body(1, Infinity);
    this.body.setPos(posicion);
    //body.w_limit = 0.02;
    this.body.setAngle(0);
    this.sprite.setBody(this.body);

    // Se añade el cuerpo al espacio
    this.space.addBody(this.body);
    var radio = this.sprite.getContentSize().width / 2;
    // forma
    this.shape = new cp.CircleShape(this.body, radio , cp.vzero);
    this.shape.setFriction(0);
    this.shape.setCollisionType(tipoJugador);
    //this.shape.setElasticity(0);
    // forma dinamica
    this.space.addShape(this.shape);
    // añadir sprite a la capa

    // ejecutar la animación
    this.sprite.runAction(actionAnimacionBucle);
    layer.addChild(this.sprite,10);


    }, moverIzquierda: function(){
    console.log("tiempoDano: "+ this.tiempoDano);
        console.log("tiempoDano2: "+this.tiempoDano);
        if ( this.estado != correr &&  this.estado!=flotar && this.tiempoDisparando <= 0 && this.tiempoDano <=0 ) {
            this.estado = correr;
            this.sprite.stopAllActions();
            this.sprite.runAction(this.animacionesCorrer[this.forma]);
        }
        console.log("asd: "+ this.forma);
        this.sprite.scaleX = -1;

        this.body.applyImpulse(cp.v(-100, 0), cp.v(0, 0));


    }, moverDerecha: function(){
        if ( this.estado != correr && this.estado!=flotar && this.tiempoDisparando <= 0 && this.tiempoDano <=0) {
            this.estado = correr;
            this.sprite.stopAllActions();
            this.sprite.runAction(this.animacionesCorrer[this.forma]);
        }
        this.sprite.scaleX = 1;

        this.body.applyImpulse(cp.v(100, 0), cp.v(0, 0));


    }, moverArriba: function(){
        console.log("tiempoflotar: "+ this.tiempoFlotar);
        if(this.estado==saltar && this.tiempoFlotar<0){
            this.lastChangedState=flotar;
            this.estado=flotar;
            console.log(this.estado);
            cc.audioEngine.playEffect(res.floatsound_wav);
            this.sprite.stopAllActions();
            this.sprite.runAction(this.animacionesFlotar[this.forma]);
            this.tiempoFlotar=cteTiempoFlotar; //a esperar otra vez.
            this.body.vy=0;
            this.body.applyImpulse(cp.v(0, 200), cp.v(0, 0))
        }
        if((this.tiempoFlotar<0 || this.forma==aire) && this.estado==flotar){
            if(this.forma==aire){
                this.body.vy=0;
                this.body.applyImpulse(cp.v(0, 100), cp.v(0, 0));
            }
            else{
                this.tiempoFlotar=cteTiempoFlotar; //a esperar otra vez.
                cc.audioEngine.playEffect(res.floatsound_wav);
                this.body.vy=0;
                this.body.applyImpulse(cp.v(0, 200), cp.v(0, 0));
            }
        }
        if(this.estado!=saltar && this.estado!=flotar){


               if ( this.body.vy < 3 && this.body.vy > - 3   ){
                   this.contadorVelYCero  = this.contadorVelYCero +1 ;
               }

               console.log("vel Y:"+this.body.vy );

               if ( this.contadorVelYCero  > 1 ){
                  if ( this.estado != saltar && this.tiempoDisparando <= 0 && this.tiempoDano <=0) {
                       this.lastChangedState=saltar;
                       this.estado = saltar;
                       cc.audioEngine.playEffect(res.jumpsound_wav);
                       this.sprite.stopAllActions();
                       this.sprite.runAction(this.animacionesSaltar[this.forma]);
                   }

                   this.body.applyImpulse(cp.v(0, 300), cp.v(0, 0));
                   this.contadorVelYCero = 0;
               }

       }
       this.tocarSuelo=1;



    },moverAbajo:function(){
        if(this.forma==aire && this.estado==flotar){
            this.body.applyImpulse(cp.v(0, -100), cp.v(0, 0));
        }
    },impactar:function(){

        this.forma=normal;
        this.invencibilidad=true;
        this.tiempoDano=cteTiempoDano;

        console.log("tiempoDaño: "+this.tiempoDano);

        this.sprite.stopAllActions();
        this.sprite.runAction(this.animacionDano);



    }, actualizarAnimacion: function(){
        if ( this.tiempoDisparando  > 0 ){
            this.tiempoDisparando  = this.tiempoDisparando  - 1;
        }

         if(this.estado==flotar || this.estado==saltar){
                this.tiempoFlotar=this.tiempoFlotar-1;
         }
         else{
            this.tiempoFlotar=cteTiempoFlotar;
            }

         console.log("timeFloat: "+ this.tiempoFlotar);

        if ( this.body.vy <= 10 && this.body.vy >= -15
           && this.body.vx <= 0.1 && this.body.vx >= -0.1 ){
            console.log("tocandoSuelo="+this.tocarSuelo);
              if( this.estado != quieto  && this.tiempoDisparando <= 0 && this.tocarSuelo==0 && this.tiempoDano <=0){
                  this.estado = quieto;
                  this.sprite.stopAllActions();
                  this.sprite.runAction(this.animacionesQuieto[this.forma]);
                  this.tiempoFlotar=cteTiempoFlotar;
              }
        }

        if ( this.body.vy >= 10 || this.body.vy <= -10 ){
              if( this.estado != saltar && this.estado!=flotar && this.tiempoDisparando <= 0 && this.tiempoDano<=0){
                 if(this.lastChangedState==saltar){
                      this.estado = saltar;
                      this.sprite.stopAllActions();
                      this.sprite.runAction(this.animacionesSaltar[this.forma]);
                  }
                  if(this.lastChangedState==flotar){
                     this.estado=flotar;
                     this.sprite.stopAllActions();
                     this.sprite.runAction(this.animacionesFlotar[this.forma]);

                  }
              }
        }
        if(this.invencibilidad){
            if(this.tiempoInvencible%10==0){
                this.sprite.setOpacity(180);
            }
            else{
                if(this.tiempoInvencible%5){
                this.sprite.setOpacity(50);
                }
            }

            if(this.tiempoDano>0){
            this.tiempoDano=this.tiempoDano-1;

            if(this.tiempoDano<=0){
                console.log("lastChangesState="+this.lastChangedState);
                //Actualizamos todos los sprites posibles para que no se mantenga el sprite de daño.
                if(this.estado==flotar){
                    this.sprite.stopAllActions();
                    this.sprite.runAction(this.animacionesFlotar[this.forma]);
                   }
                if(this.estado==saltar){
                    this.sprite.stopAllActions();
                    this.sprite.runAction(this.animacionesSaltar[this.forma]);
                   }
                if(this.estado==quieto){
                    this.sprite.stopAllActions();
                    this.sprite.runAction(this.animacionesQuieto[this.forma]);
                }
                if(this.estado==correr){
                    this.sprite.stopAllActions();
                    this.sprite.runAction(this.animacionesCorrer[this.forma]);
                }
            }
            }

            this.tiempoInvencible=this.tiempoInvencible-1;

        }



        if(this.tiempoInvencible<=0){
            this.invencibilidad=false;
            this.tiempoInvencible=cteTiempoInvencibilidad;
            this.sprite.setOpacity(252);
        }

    }, disparar: function(){
        if(this.forma!=normal){
         this.sprite.stopAllActions();
         this.sprite.runAction(this.animacionesDisparar[this.forma]);
         cc.audioEngine.playEffect(res.fireshootsound_wav);
         this.tiempoDisparando = 40;
         this.estado = disparando;
         }
     },transform: function(tipo){
        if(tipo!=this.forma){
        this.forma=tipo;

        cc.audioEngine.playEffect(res.transformationsound_wav);

        //Actualizamos los sprites en cada caso para que la actualizacion del sprite sea inmediata.
        if(this.estado==flotar){
            this.sprite.stopAllActions();
            this.sprite.runAction(this.animacionesFlotar[this.forma]);

        }

        if(this.estado==saltar){
            this.sprite.stopAllActions();
            this.sprite.runAction(this.animacionesFlotar[this.forma]);
        }

        }
    }
});
