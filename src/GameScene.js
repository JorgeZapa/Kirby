
var tipoJugador = 1;
var tipoTomate = 2;
var tipoEnemigo = 3;
var tipoContenedor = 4;
var tipoDisparoHielo = 5;
var tipoDisparoFuego = 6;
var tipoDisparoAire = 7;
var tipoSuelo = 8;
var tipoFiguraHielo = 9;
var tipoFiguraFuego = 10;
var tipoFiguraAire = 11;
var tipoBloqueHielo = 12;
var tipoTronco = 13;
var tipoObstaculoHielo = 14;
var tipoMeta = 15;
var tipoPincho=16;

var niveles = [ res.map1_tmx , res.map2_tmx ];
var nivelActual = 0;

var GameLayer = cc.Layer.extend({
    meta:null,
    tomates:0,
    tiempoDisparar:0,
    disparosHielo:[],
    disparosFuego:[],
    disparosAire:[],
    disparosEliminar:[],
    enemigos:[],
    enemigosEliminar:[],
    formasEliminar:[],
    bloquesHielo:[],
    bloqueAñadir:[],
    troncos:[],
    obstaculosHielo:[],
    createBloque:false,
    teclaIzquierda:false,
    teclaDerecha:false,
    teclaArriba:false,
    teclaBarra:false,
    tomates:[],
    figurasPingu:[],
    figurasFuego: [],
    figurasAire: [],
    jugador: null,
    space:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.animacion_enemigo_plist);
        cc.spriteFrameCache.addSpriteFrames(res.tomate_plist);
        //walks
        cc.spriteFrameCache.addSpriteFrames(res.playerrunright_plist);
        cc.spriteFrameCache.addSpriteFrames(res.hielowalkright_plist);
        cc.spriteFrameCache.addSpriteFrames(res.fuegowalkright_plist);
        cc.spriteFrameCache.addSpriteFrames(res.airewalkright_plist);
        //jumps
        cc.spriteFrameCache.addSpriteFrames(res.playerjumpright_plist);
        cc.spriteFrameCache.addSpriteFrames(res.hielojumpright_plist);
        cc.spriteFrameCache.addSpriteFrames(res.fuegojumpright_plist);
        cc.spriteFrameCache.addSpriteFrames(res.airejumpright_plist);
        //idles
        cc.spriteFrameCache.addSpriteFrames(res.playeridleright_plist);
        cc.spriteFrameCache.addSpriteFrames(res.hieloidleright_plist);
        cc.spriteFrameCache.addSpriteFrames(res.fuegoidleright_plist);
        cc.spriteFrameCache.addSpriteFrames(res.aireidleright_plist);
        //floats
        cc.spriteFrameCache.addSpriteFrames(res.playerfloatright_plist);
        cc.spriteFrameCache.addSpriteFrames(res.hielofloatright_plist);
        cc.spriteFrameCache.addSpriteFrames(res.fuegofloatright_plist);
        cc.spriteFrameCache.addSpriteFrames(res.airefloatright_plist);
        //impactado
        cc.spriteFrameCache.addSpriteFrames(res.playerimpactado_plist);
        //disparar
        cc.spriteFrameCache.addSpriteFrames(res.dispararHielo_plist);
        cc.spriteFrameCache.addSpriteFrames(res.dispararFuego_plist);
        cc.spriteFrameCache.addSpriteFrames(res.dispararAire_plist);
        //disparos
        cc.spriteFrameCache.addSpriteFrames(res.disparohielo_plist);
        cc.spriteFrameCache.addSpriteFrames(res.disparofuego_plist);
        cc.spriteFrameCache.addSpriteFrames(res.disparoaire_plist);
        //figuras
        cc.spriteFrameCache.addSpriteFrames(res.figuraPingu_plist);
        cc.spriteFrameCache.addSpriteFrames(res.figuraFuego_plist);
        cc.spriteFrameCache.addSpriteFrames(res.figuraAire_plist);
        //obstáculos
        cc.spriteFrameCache.addSpriteFrames(res.obstaculoHielo_plist);
        cc.spriteFrameCache.addSpriteFrames(res.tronco_plist);
        //otros
        cc.spriteFrameCache.addSpriteFrames(res.bloqueHielo_plist);

        cc.spriteFrameCache.addSpriteFrames(res.goal_plist);


        //Musica Nivel.
        if(nivelActual==0){
            cc.audioEngine.playMusic(res.forestmusic_mp3, true);
        }
        else{
            cc.audioEngine.playMusic(res.moonlightmusic_mp3, true);
        }


        // Inicializar Space
        this.space = new cp.Space();
        this.space.gravity = cp.v(0, -350);

        // Depuración
        //this.depuracion = new cc.PhysicsDebugNode(this.space);
        //this.addChild(this.depuracion, 10);

        // jugador y tomate
        // IMPORTANTE: Invocamos el método antes de resolver la colisión (realmente no habrá colisión).
        //this.space.addCollisionHandler(tipoJugador, tipoTomate,
        //      null, this.colisionJugadorConTomate.bind(this), null, null);


        this.jugador = new Jugador(this.space,
               cc.p(50,150), this);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.teclaPulsada,
            onKeyReleased: this.teclaLevantada
        }, this);

        this.cargarMapa();
        this.scheduleUpdate();

        // jugador y Tomate
        // IMPORTANTE: Invocamos el método antes de resolver la colisión (realmente no habrá colisión).
        this.space.addCollisionHandler(tipoJugador, tipoTomate,
              null, this.colisionJugadorConTomate.bind(this), null, null);

        //jugador y figuraPinguino
        this.space.addCollisionHandler(tipoJugador, tipoFiguraHielo,
                      null, this.colisionJugadorConFiguraHielo.bind(this), null, null);

        //jugador y figuraFuego
        this.space.addCollisionHandler(tipoJugador, tipoFiguraFuego,
                      null, this.colisionJugadorConFiguraFuego.bind(this), null, null);


        //jugador y figuraAire
        this.space.addCollisionHandler(tipoJugador, tipoFiguraAire,
                      null, this.colisionJugadorConFiguraAire.bind(this), null, null);

        //jugador y Enemigo
        this.space.addCollisionHandler(tipoJugador, tipoEnemigo,
                      null, null, this.colisionJugadorConEnemigo.bind(this),null);

        //jugador y Meta
        this.space.addCollisionHandler(tipoJugador, tipoMeta,
                      null, this.colisionJugadorConMeta.bind(this), null,null);

       // enemigo y contenedor
       // IMPORTANTE: Invocamos el método antes de resolver la colisión (realmente no habrá colisión).
       this.space.addCollisionHandler(tipoEnemigo, tipoContenedor,
            null, this.colisionEnemigoConContenedor.bind(this), null, null);

       // disparo de hielo y enemigo
       // IMPORTANTE: Invocamos el método antes de resolver la colisión (realmente no habrá colisión).
       this.space.addCollisionHandler(tipoDisparoHielo, tipoEnemigo,
            null, this.colisionDisparoHieloConEnemigo.bind(this), null, null);

       // disparo de fuego y enemigo
       this.space.addCollisionHandler(tipoDisparoFuego, tipoEnemigo,
                   null, this.colisionDisparoFuegoConEnemigo.bind(this), null, null);

       //disparo de aire y enemigo
       this.space.addCollisionHandler(tipoDisparoAire, tipoEnemigo,
                   null, this.colisionDisparoAireConEnemigo.bind(this), null, null);

       // disparo de fuego y tronco
              this.space.addCollisionHandler(tipoDisparoFuego, tipoTronco,
                   null, this.colisionDisparoFuegoConTronco.bind(this), null, null);

      // disparo y muro
      // IMPORTANTE: Invocamos el método antes de resolver la colisión (realmente no habrá colisión).
      this.space.addCollisionHandler(tipoDisparoHielo, tipoSuelo,
           null, this.colisionDisparoHieloConSuelo.bind(this), null, null);

      //jugador y suelo.
      this.space.addCollisionHandler(tipoJugador, tipoSuelo,
                                null,null,this.colisionJugadorConSuelo.bind(this),null);

      //jugador y pinchos.
            this.space.addCollisionHandler(tipoJugador, tipoPincho,
                                      null,null,this.colisionJugadorConPinchos.bind(this),null);

      //BloqueHielo con ObstaculoHielo.
      this.space.addCollisionHandler(tipoBloqueHielo, tipoObstaculoHielo,
                                 null, this.colisionBloqueHieloConObstaculoHielo.bind(this),null);



       return true;
},update:function (dt) {
     this.space.step(dt);
     var capaControles =
               this.getParent().getChildByTag(idCapaControles);


     for(var i=0; i<this.disparosFuego.length;i++){
        this.disparosFuego[i].tiempoVida=this.disparosFuego[i].tiempoVida-1;
        this.disparosFuego[i].body.vy=0; //No se ve afectado por la gravedad
         console.log("tiempoVida: "+this.disparosFuego[i].tiempoVida)
        if(this.disparosFuego[i].tiempoVida<=0){
            this.disparosFuego[i].eliminar();
            this.disparosFuego.splice(i,1);
        }
     }

     console.log("Estado jugador: "+ this.jugador.estado);
     console.log("Forma jugador: "+ this.jugador.forma);



      // Mover enemigos:
       for(var i = 0; i < this.enemigos.length; i++) {
          var enemigo = this.enemigos[i];
          enemigo.moverAutomaticamente();
      }

      console.log("Formas eliminar: "+this.formasEliminar.length);
     // Eliminar formas:
     for(var i = 0; i < this.formasEliminar.length; i++) {
         var shape = this.formasEliminar[i];

         for (var r = 0; r < this.tomates.length; r++) {
           if (this.tomates[r].shape == shape) {
               this.tomates[r].eliminar();
               this.tomates.splice(r, 1);
           }
         }
         for (var r = 0; r < this.enemigos.length; r++) {
            if (this.enemigos[r].shape == shape) {
                console.log("Enemigo eliminado");
                this.enemigos[r].eliminar();
                this.enemigos.splice(r, 1);
                if(this.createBloque){
                this.bloquesHielo.push(new BloqueHielo(this.space, shape.body.getPos(), this));
                this.createBloque=false;
                }
            }
         }

         for (var r = 0; r < this.disparosHielo.length; r++) {
             if (this.disparosHielo[r].shape == shape) {
                 this.disparosHielo[r].eliminar();
                 this.disparosHielo.splice(r, 1);
             }
         }

         for (var r = 0; r < this.disparosAire.length; r++) {
              if (this.disparosAire[r].shape == shape) {
                  this.disparosAire[r].eliminar();
                  this.disparosAire.splice(r, 1);
              }
          }

         for (var r = 0; r < this.bloquesHielo.length; r++) {
              if (this.bloquesHielo[r].shape == shape) {
                  this.bloquesHielo[r].eliminar();
                  this.bloquesHielo.splice(r, 1);
              }
          }

         for (var r = 0; r < this.obstaculosHielo.length; r++) {
              if (this.obstaculosHielo[r].shape == shape) {
                  this.obstaculosHielo[r].eliminar();
                  this.obstaculosHielo.splice(r, 1);
              }
          }

          for (var r = 0; r < this.troncos.length; r++) {
              if (this.troncos[r].shape == shape) {
                  this.troncos[r].eliminar();
                  this.troncos.splice(r, 1);
               }
           }
     }

     this.formasEliminar = [];

     // Caída, sí cae vuelve a la posición inicial
     if( this.jugador.body.p.y < -100){
        var capaControles =
                           this.getParent().getChildByTag(idCapaControles);
        this.jugador.body.p = cc.p(50,150);
        this.jugador.forma=normal;
        capaControles.resetearVida();
        cc.audioEngine.playEffect(res.lostsound_wav);
     }

    if ( this.teclaBarra && new Date().getTime() - this.tiempoDisparar > 1000 && this.jugador.forma!=normal ){
        this.tiempoDisparar = new Date().getTime();
        if(this.jugador.forma==hielo){
            var disparo = new DisparoHielo(this.space,
              cc.p(this.jugador.body.p.x, this.jugador.body.p.y),
              this);
          }
        if(this.jugador.forma==fuego){
        var disparo = new DisparoFuego(this.space,
                      cc.p(this.jugador.body.p.x, this.jugador.body.p.y),
                      this);
        }

        if(this.jugador.forma==aire){
        var disparo = new DisparoAire(this.space,
                      cc.p(this.jugador.body.p.x, this.jugador.body.p.y),
                      this);

        }

          if ( this.jugador.sprite.scaleX > 0){
               disparo.body.vx = 400;
          } else {
               disparo.body.vx = -400;
               disparo.sprite.scaleX=-1;
          }
        if(this.jugador.forma==hielo){
            this.disparosHielo.push(disparo);
        }
        if(this.jugador.forma==fuego){
            this.disparosFuego.push(disparo);
        }
        if(this.jugador.forma==aire){
            this.disparosAire.push(disparo);
        }

        this.jugador.disparar();
    }

     if ( this.teclaArriba ){
        console.log("dado");
        this.jugador.moverArriba();
     }
     if (this.teclaIzquierda){
        this.jugador.moverIzquierda();
     }
     if( this.teclaDerecha ){
        this.jugador.moverDerecha();
     }
     if( this.teclaAbajo){
        this.jugador.moverAbajo();
     }

     if ( !this.teclaIzquierda
        && !this.teclaDerecha ){
        this.jugador.body.vx = 0;
     }

    //Si esta en forma aire y en flotar se mueve de forma diferente.
    if(this.jugador.forma==aire && this.jugador.estado==flotar){

        if(!this.teclaArriba && !this.teclaAbajo){
            this.jugador.body.vy=-15;
        }

        if(!this.teclaIzquierda && !this.teclaDerecha){
            this.jugador.body.vx=0;
        }

    }


     this.jugador.actualizarAnimacion();

     // actualizar camara (posición de la capa).
        var posicionX = this.jugador.body.p.x -200;
        var posicionY = this.jugador.body.p.y -200;

    if(posicionX < 0){
        posicionX = 0;
    }
    if(posicionY < 0){
        posicionY = 0;
    }

    this.setPosition(cc.p( -posicionX, -posicionY ));


     if (this.jugador.body.vx < -200){
          this.jugador.body.vx = -200;
     }

     if (this.jugador.body.vx > 200){
         this.jugador.body.vx = 200;
     }

     //Tambien tenemos que limitar la velocidad en los ejes y cuando estamos "levitando".
     if(this.jugador.forma==aire && this.jugador.estado==flotar){
        if (this.jugador.body.vy < -200){
              this.jugador.body.vy = -200;
         }

         if (this.jugador.body.vy > 200){
             this.jugador.body.vy = 200;
         }
     }

}, cargarMapa:function () {
       this.mapa = new cc.TMXTiledMap(niveles[nivelActual]);
       // Añadirlo a la Layer
       this.addChild(this.mapa);
       // Ancho del mapa
       this.mapaAncho = this.mapa.getContentSize().width;

       // Solicitar los objeto dentro de la capa Suelos
       var grupoPinchos = this.mapa.getObjectGroup("Pinchos");
       var pinchosArray = grupoPinchos.getObjects();

       // Los objetos de la capa suelos se transforman a
       // formas estáticas de Chipmunk ( SegmentShape ).
       for (var i = 0; i < pinchosArray.length; i++) {
           var pincho = pinchosArray[i];
           var puntosPinchos = pincho.polylinePoints;
           for(var j = 0; j < puntosPinchos.length - 1; j++){
               var bodyPincho = new cp.StaticBody();

               var shapePincho = new cp.SegmentShape(bodyPincho,
                   cp.v(parseInt(pincho.x) + parseInt(puntosPinchos[j].x),
                       parseInt(pincho.y) - parseInt(puntosPinchos[j].y)),
                   cp.v(parseInt(pincho.x) + parseInt(puntosPinchos[j + 1].x),
                       parseInt(pincho.y) - parseInt(puntosPinchos[j + 1].y)),
                   8);
               shapePincho.setFriction(0);
               shapePincho.setCollisionType(tipoPincho);
               //shapeSuelo.setElasticity(0);
               this.space.addStaticShape(shapePincho);
           }
       }


        // Solicitar los objeto dentro de la capa Suelos
               var grupoSuelos = this.mapa.getObjectGroup("Suelos");
               var suelosArray = grupoSuelos.getObjects();

               // Los objetos de la capa suelos se transforman a
               // formas estáticas de Chipmunk ( SegmentShape ).
               for (var i = 0; i < suelosArray.length; i++) {
                   var suelo = suelosArray[i];
                   var puntos = suelo.polylinePoints;
                   for(var j = 0; j < puntos.length - 1; j++){
                       var bodySuelo = new cp.StaticBody();

                       var shapeSuelo = new cp.SegmentShape(bodySuelo,
                           cp.v(parseInt(suelo.x) + parseInt(puntos[j].x),
                               parseInt(suelo.y) - parseInt(puntos[j].y)),
                           cp.v(parseInt(suelo.x) + parseInt(puntos[j + 1].x),
                               parseInt(suelo.y) - parseInt(puntos[j + 1].y)),
                           10);
                       shapeSuelo.setFriction(0);
                       shapeSuelo.setCollisionType(tipoSuelo);
                       //shapeSuelo.setElasticity(0);
                       this.space.addStaticShape(shapeSuelo);
                   }
               }
       var grupoTomates = this.mapa.getObjectGroup("Tomates");
       var tomatesArray = grupoTomates.getObjects();
       for (var i = 0; i < tomatesArray.length; i++) {
           var tomate = new Tomate(this.space,
               cc.p(tomatesArray[i]["x"],tomatesArray[i]["y"]),
               this);

           this.tomates.push(tomate);
       }

       var grupoMeta = this.mapa.getObjectGroup("Meta");
          var metaArray = grupoMeta.getObjects();
          for (var i = 0; i < metaArray.length; i++) {
          //Deberia haber solo una, porsiacaso ejecutamos el loop.
          this.meta = new Goal(this.space,
              cc.p(metaArray[i]["x"],metaArray[i]["y"]),
              this);

          }

       var grupoFigurasPingu = this.mapa.getObjectGroup("FigurasPingu");
       var figurasPinguArray = grupoFigurasPingu.getObjects();
       for (var i =0; i<figurasPinguArray.length; i++){
        var figuraPingu = new FiguraPinguino(this.space, cc.p(figurasPinguArray[i]["x"],
                                 figurasPinguArray[i]["y"]),this);

        this.figurasPingu.push(figuraPingu);
       }

       var grupoFigurasFuego = this.mapa.getObjectGroup("FigurasFuego");
       var figurasFuegoArray = grupoFigurasFuego.getObjects();
       for (var i =0; i<figurasFuegoArray.length; i++){
           var figuraFuego = new FiguraFuego(this.space, cc.p(figurasFuegoArray[i]["x"],
                                    figurasFuegoArray[i]["y"]),this);

           this.figurasFuego.push(figuraFuego);
          }

       var grupoFigurasAire = this.mapa.getObjectGroup("FigurasAire");
       var figurasAireArray = grupoFigurasAire.getObjects();
       for (var i =0; i<figurasAireArray.length; i++){
          var figuraAire = new FiguraAire(this.space, cc.p(figurasAireArray[i]["x"],
                                figurasAireArray[i]["y"]),this);

          this.figurasAire.push(figuraAire);
      }

       var grupoObstaculosHielo = this.mapa.getObjectGroup("ObstaculosHielo");
       var obstaculosHieloArray = grupoObstaculosHielo.getObjects();
       for (var i =0; i<obstaculosHieloArray.length; i++){
               var obstaculoHielo = new ObstaculoHielo(this.space, cc.p(obstaculosHieloArray[i]["x"],
                                        obstaculosHieloArray[i]["y"]),this);

               this.obstaculosHielo.push(obstaculoHielo);
              }

       var grupoTroncos = this.mapa.getObjectGroup("Troncos" );
       var troncosArray = grupoTroncos.getObjects();
        for (var i =0; i<troncosArray.length; i++){
             var tronco = new Tronco(this.space, cc.p(troncosArray[i]["x"],
                                    troncosArray[i]["y"]),this);

             this.troncos.push(tronco);
                 }

       var grupoEnemigos = this.mapa.getObjectGroup("Enemigos");
       var enemigosArray = grupoEnemigos.getObjects();
       for (var i = 0; i < enemigosArray.length; i++) {
           var enemigo = new Enemigo(this.space,
               cc.p(enemigosArray[i]["x"],enemigosArray[i]["y"]),
               this);

           this.enemigos.push(enemigo);
           console.log("Enemigo agregado");
       }




       var grupoContenedores = this.mapa.getObjectGroup("Contenedores");
       var contenedoresArray = grupoContenedores.getObjects();
       for (var i = 0; i < contenedoresArray.length; i++) {
           var contenedor = contenedoresArray[i];
           var puntos = contenedor.polylinePoints;

           for(var j = 0; j < puntos.length - 1; j++){
               var bodyContenedor = new cp.StaticBody();

               var shapeContenedor = new cp.SegmentShape(bodyContenedor,
                   cp.v(parseInt(contenedor.x) + parseInt(puntos[j].x),
                       parseInt(contenedor.y) - parseInt(puntos[j].y)),
                   cp.v(parseInt(contenedor.x) + parseInt(puntos[j + 1].x),
                       parseInt(contenedor.y) - parseInt(puntos[j + 1].y)),
                   5);

               shapeContenedor.setSensor(true);
               shapeContenedor.setCollisionType(tipoContenedor);
               shapeContenedor.setFriction(1);

               this.space.addStaticShape(shapeContenedor);
           }
       }
    },teclaPulsada: function(keyCode, event){
        var instancia = event.getCurrentTarget();

        // Flecha izquierda
        if( keyCode == 37){
            instancia.teclaIzquierda = true;
        }
        // Flecha derecha
        if( keyCode == 39){
            instancia.teclaDerecha = true;
        }
        // Flecha arriba
        if( keyCode == 38){
            instancia.teclaArriba = true;
        }
        //Flecha abajo
        if( keyCode ==40){
            instancia.teclaAbajo = true;
        }
        // Barra espaciadora
        if( keyCode == 32){
            instancia.teclaBarra = true;
        }
    },teclaLevantada: function(keyCode, event){
        var instancia = event.getCurrentTarget();
        console.log("Tecla Levantada "+keyCode);
        // Flecha izquierda
        if( keyCode == 37){
            instancia.teclaIzquierda = false;
        }
        // Flecha derecha
        if( keyCode == 39){
            instancia.teclaDerecha = false;
        }
        // Flecha arriba
        if( keyCode == 38){
            instancia.teclaArriba = false;
        }
        //Flecha abajo
        if( keyCode ==40){
            instancia.teclaAbajo = false;
        }
        // Barra espaciadora
        if( keyCode == 32){
            instancia.teclaBarra = false;
        }
     },colisionJugadorConTomate:function (arbiter, space) {

        // Marcar tomate para eliminarla
        var shapes = arbiter.getShapes();
        // shapes[0] es el jugador
        this.formasEliminar.push(shapes[1]);

        this.tiempoEfecto = 100;

        var capaControles =
           this.getParent().getChildByTag(idCapaControles);
        capaControles.agregarTomate();
        capaControles.ganarVida();

        cc.audioEngine.playEffect(res.point_wav);
     },colisionJugadorConFiguraHielo:function(arbiter, space){

        this.jugador.transform(hielo);
     },colisionJugadorConFiguraFuego:function(arbiter, space){

        this.jugador.transform(fuego);
     },colisionJugadorConFiguraAire:function(arbiter, space){

        this.jugador.transform(aire);
     },colisionJugadorConEnemigo:function(arbiter, space){
       if(!(this.jugador.invencibilidad)){
        var capaControles =
                   this.getParent().getChildByTag(idCapaControles);
        capaControles.perderVida();
        console.log("vidas="+capaControles.contadorVidas);
        if(capaControles.contadorVidas==0){
            this.jugador.forma=normal;
            this.jugador.body.p = cc.p(50,150);
            cc.audioEngine.playEffect(res.lostsound_wav);
            capaControles.resetearVida();

        }
        else{
            this.jugador.impactar();
            cc.audioEngine.playEffect(res.hittedsound_wav);
        }

        }
     },colisionJugadorConMeta:function(arbiter, space){
     if(nivelActual<1){
        nivelActual = nivelActual + 1;
     }
     else{
         nivelActual=0;
     }
        cc.audioEngine.playEffect(res.passedsound_wav);
        var capaControles =
                   this.getParent().getChildByTag(idCapaControles);
        //No hace falta, al crear un nuevo nivel tambien se crea una nueva capa de controles.
        //capaControles.resetearTomates();
        //capaControles.resetearVida();
        cc.director.runScene(new GameScene());

     },colisionEnemigoConContenedor:function (arbiter, space) {
          var shapes = arbiter.getShapes();
          // shapes[0] es el enemigo
          var formaEnemigo = shapes[0];
          formaEnemigo.body.vx = 0; // Parar enemigo
     }, colisionDisparoHieloConEnemigo:function (arbiter, space) {
          var shapes = arbiter.getShapes();

          var disparoShape = shapes[0];
          var enemigo = shapes[1];

          //this.bloquesHielo.push(new BloqueHielo(this.space, enemigo.body.getPos(), this));
          this.createBloque=true; //tenemos que crear un bloque.
          this.formasEliminar.push(enemigo);

          this.formasEliminar.push(shapes[0]);

     },colisionDisparoFuegoConEnemigo:function (arbiter, space){
        var shapes = arbiter.getShapes();
        this.formasEliminar.push(shapes[1]);
        //el disparo no desaparece en este caso.

     },colisionDisparoAireConEnemigo:function (arbiter, space){
        var shapes = arbiter.getShapes();
        shapes[1].body.applyImpulse(cp.v(shapes[0].body.vx, 0), cp.v(0, 0));

     },colisionDisparoFuegoConTronco:function (arbiter, space){
        var shapes = arbiter.getShapes();
        this.formasEliminar.push(shapes[1]); //Se elimina el tronco pero el disparo de fuego no.

     },colisionDisparoHieloConSuelo:function (arbiter, space) {
          var shapes = arbiter.getShapes();

          this.formasEliminar.push(shapes[0]);
     }, colisionJugadorConSuelo:function (arbiter, space){
        if(this.jugador.tocarSuelo!=0){
            this.jugador.tocarSuelo=0; // Notificamos que esta en el suelo.
            this.jugador.lastChangedState=saltar; //si caemos flotando al caernos no peue seguir siendo flotando.
        }
     },colisionJugadorConPinchos: function(arbiter, space){
       if(!(this.jugador.invencibilidad)){
               var capaControles =
                          this.getParent().getChildByTag(idCapaControles);
               capaControles.perderVida();
               console.log("vidas="+capaControles.contadorVidas);
               if(capaControles.contadorVidas==0){
                   this.jugador.forma=normal;
                   this.jugador.body.p = cc.p(50,150);
                   cc.audioEngine.playEffect(res.lostsound_wav);
                   capaControles.resetearVida();

               }
               else{
                   this.jugador.impactar();
                   cc.audioEngine.playEffect(res.hittedsound_wav);
               }
               }
     },colisionBloqueHieloConObstaculoHielo: function(arbiter, space){
        var shapes = arbiter.getShapes();

        //Eliminamos ambas.
        this.formasEliminar.push(shapes[0]);
        this.formasEliminar.push(shapes[1]);

     }
});

var idCapaJuego = 1;
var idCapaControles = 2;


var GameScene = cc.Scene.extend({
    onEnter:function () {
                this.removeAllChildren(true);
        this._super();
        var layer = new GameLayer();
        this.addChild(layer, 0, idCapaJuego);


        var controlesLayer = new ControlesLayer();
        this.addChild(controlesLayer, 0, idCapaControles);

    }
});
