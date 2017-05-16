var ControlesLayer = cc.Layer.extend({
    etiquetaTomates:null,
    tomates:0,
    contadorVidas:3,
    etiquetaVidas:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        // Contador Tomates
        this.etiquetaTomates = new cc.LabelTTF("Tomates: 0", "Helvetica", 20);
        this.etiquetaTomates.setPosition(cc.p(size.width - 90, size.height - 20));
        this.etiquetaTomates.fillStyle = new cc.Color(0, 0, 0, 0);
        this.addChild(this.etiquetaTomates);


        this.etiquetaVidas = new cc.LabelTTF("Vidas: ","Helvetica", 20);
        this.etiquetaVidas.setPosition(40, size.height - 40);
        this.addChild(this.etiquetaVidas);

        for(var i=0; i<this.contadorVidas;i++){
            var life = new cc.Sprite.create(res.life_png);
            life.x=100+i*60;
            life.y=size.height-40;
            life.setTag(i);
            this.addChild(life);

        }

        return true;

    }, agregarTomate:function(){
         this.tomates = this.tomates + 1;
         this.etiquetaTomates.setString("Tomates: " + this.tomates);

    }, perderVida:function(){
        if(this.contadorVidas>=1){
           this.contadorVidas=this.contadorVidas-1;
           this.removeChild(this.getChildByTag(this.contadorVidas));
       }
    }, ganarVida:function(){
        if(this.contadorVidas<3){
            var life = new cc.Sprite.create(res.life_png);
            life.x=100+this.contadorVidas*60;
            life.y=cc.winSize.height-40;
            life.setTag(this.contadorVidas);
            this.addChild(life);
            this.contadorVidas=this.contadorVidas+1;
        }

    }, resetearVida:function(){
        for(var i=this.contadorVidas; i<3;i++){
             var life = new cc.Sprite.create(res.life_png);
             life.x=100+i*60;
             life.y=cc.winSize.height-40;
             life.setTag(i);
             this.addChild(life);

        }

        this.contadorVidas=3;



    }, resetearTomates:function(){
        this.tomates = 0;
        this.etiquetaTomates.setString("Tomates: " + this.tomates);

    }
});
