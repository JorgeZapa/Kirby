
var MenuLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;

        var titulosPosibles=[res.menu_titulo1_png, res.menu_titulo2_png,
                               res.menu_titulo3_png, res.menu_titulo4_png]

        var choosen = parseInt(Math.random()*titulosPosibles.length);

        console.log(choosen);
        // Fondo
        var spriteFondoTitulo= new cc.Sprite(titulosPosibles[choosen]);
        // Asigno posición central
        spriteFondoTitulo.setPosition(cc.p(size.width / 2, size.height / 2));
        // Lo escalo porque es más pequeño que la pantalla
        spriteFondoTitulo.setScale(size.height / spriteFondoTitulo.height);
        // Añado Sprite a la escena
        this.addChild(spriteFondoTitulo);

        //MenuItemSprite para cada botón
        var menuBotonJugar = new cc.MenuItemSprite(
            new cc.Sprite(res.boton_jugar_png), // IMG estado normal
            new cc.Sprite(res.boton_jugar_png), // IMG estado pulsado
            this.pulsarBotonJugar, this);


        // creo el menú pasándole los botones
        var menu = new cc.Menu(menuBotonJugar);
        // Asigno posición central
        menu.setPosition(cc.p(size.width / 2, size.height * 0.25));
        // Añado el menú a la escena
        this.addChild(menu);
        cc.audioEngine.playMusic(res.kirbyintromusic_mp3,true);


        return true;
    }, pulsarBotonJugar : function(){
               cc.audioEngine.playEffect(res.kirbysayshi_wav);
               cc.director.runScene(new GameScene());
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});

