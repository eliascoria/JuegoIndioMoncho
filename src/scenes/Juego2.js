// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Juego2 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Juego2");
    
  }
  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
    this.enemigo
    this.gameOver = false;
    this.puntaje = 0;
    this.cantidadEstrellas = 0;
    console.log("Prueba !");
  }

  create() {
    
    //sound
    this.soundbomb = this.sound.add("explosion");
    this.soundJump = this.sound.add("jumpindio").setVolume(0.2);
    this.soundenemy = this.sound.add("enemysound");
   this.soundCollect = this.sound.add("collectsound");
   this.music = this.sound.add("spacemusic")
   this.music.stop();
   this.music.play();
    // todo / para hacer: texto de puntaje
    const map = this.make.tilemap({ key: "map2" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const capaFondo = map.addTilesetImage("sky", "tilesFondo");
    const capaPlataformas = map.addTilesetImage("platform", "tilesPlataforma");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
    const plataformaLayer = map.createLayer(
      "plataformas",
      capaPlataformas,
      0,
      0
    );
    const objectosLayer = map.getObjectLayer("objetos");

    plataformaLayer.setCollisionByProperty({ colision: true });

    console.log("spawn point player", objectosLayer);

    // crear el jugador
    // Find in the Object Layer, the name "dude" and get position
    let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
    console.log(spawnPoint);
    // The player and its settings
    this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(true);

    spawnPoint = map.findObject("objetos", (obj) => obj.name === "salida");
    console.log("spawn point salida ", spawnPoint);
    this.salida = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "salida")
      .setScale(0.2);
      this.salida.visible = false;
    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create empty group of starts
    this.estrellas = this.physics.add.group();
    this.bombs = this.physics.add.group();

    // find object layer
    // if type is "stars", add to stars group
    objectosLayer.objects.forEach((objData) => {
      //console.log(objData.name, objData.type, objData.x, objData.y);

      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "estrella": {
          // add star to scene
          // console.log("estrella agregada: ", x, y);
          const star = this.estrellas.create(x, y, "star");
          break;
        }
        case "bomb": {
          this.bomb = this.bombs.create(x, y, "bomb");
        }
      }
    });

    this.physics.add.collider(this.jugador, plataformaLayer);
    this.physics.add.collider(this.estrellas, plataformaLayer);
    this.physics.add.collider(
      this.jugador,
      this.estrellas,
      this.recolectarEstrella,
      null,
      this
    );
    this.physics.add.collider(this.salida, plataformaLayer);
    this.physics.add.overlap(
      this.jugador,
      this.salida,
      this.esVencedor,
      () => this.cantidadEstrellas >= 1, // condicion de ejecucion
      this
    );

    //add enemy
    this.enemigo = this.physics.add.image(400, 250, "enemigo").setScale(0.5).setCircle(50, 58, 38, );
    this.enemigo.setVelocity(10, 20);

    this.enemigo.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemigo, plataformaLayer);
    this.physics.add.collider(this.enemigo, null, this);
    this.physics.add.collider(
      this.jugador,
      this.enemigo,
      this.jugadorMuere,
      null,
      this
    );
    /// mostrar cantidadEstrella en pantalla
    this.cantidadEstrellasTexto = this.add.text(
      15,
      15,
      "Estrellas recolectadas: 0",
      { fontSize: "15px", fill: "#FFFFFF" }
    );
    //text follow camera
  
    //camera to follow player
    this.cameras.main.startFollow(this.jugador);
    //world bounds
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //camera dont go out of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //add bomb

    this.bomb.setVelocity(100, 200);

    this.bomb.setCollideWorldBounds(true);
    this.physics.add.collider(this.bomb, plataformaLayer);
    this.physics.add.collider(this.bomb, null, this);
    this.bomb.setBounce(1, 1);
    this.physics.add.collider(this.jugador, plataformaLayer);
    this.physics.add.collider(this.bomb, plataformaLayer);
    this.physics.add.collider(
      this.jugador,
      this.bomb,
      this.jugadorExplota,
      null,
      this
    );
    //timer
    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });
    this.timer = 60;
    this.timerText = this.add.text(350, 15, "Tiempo : " + this.timer, {
      fontSize: "15px",
      // fontStyle: "bold",
      fill: "#ffffff",
    });
    this.puntajeTexto = this.add.text(650, 15, "Puntaje : " + this.puntaje, {
      fontSize: "15px",
      fill: "#FFFFFF",
    });
    
  }

  update() {
    this.enemyFollows()
    if (this.gameOver) {
      this.scene.start("GameOver");
      this.music.stop();
    }
    // update game objects
    // check input
    //move left
    if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-160);
      this.jugador.anims.play("left", true);
    }
    //move right
    else if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(160);
      this.jugador.anims.play("right", true);
    }
    //stop
    else {
      this.jugador.setVelocityX(0);
      this.jugador.anims.play("turn");
    }

    //jump
    if (this.cursors.up.isDown && this.jugador.body.blocked.down) {
      this.jugador.setVelocityY(-330);
      this.soundJump.play();
    }
  }

  recolectarEstrella(jugador, estrella) {
    estrella.disableBody(true, true);

    // todo / para hacer: sumar puntaje
    //this.cantidadEstrellas = this.cantidadEstrellas + 1;
    this.cantidadEstrellas++;
    this.soundCollect.play();
    this.cantidadEstrellasTexto.setText(
      "Estrellas recolectadas: " + this.cantidadEstrellas
    );
    if (this.estrellas.getTotalUsed() == 0) {
      this.salida.visible = true;
    }
    this.puntaje += 100;
    this.puntajeTexto.setText("Puntaje: " + this.puntaje);
  }

  esVencedor(jugador, salida) {
    // if (this.cantidadEstrellas >= 5)
    // sacamos la condicion porque esta puesta como 4to parametro en el overlap

    console.log("estrellas recolectadas", this.cantidadEstrellas);

    this.scene.start("fin2", {
      cantidadEstrellas: this.cantidadEstrellas,
      y: "este es un dato de muestra",
      z: "este es otro atributo enviado a otro escena",
    });
    this.music.stop();
  }
  onSecond() {
    this.timer--;
    this.timerText.setText("Tiempo : " + this.timer);
    if (this.timer <= 0) {
      this.gameOver = true;
    }
  }
  jugadorExplota(jugador, bomb) {
    if (bomb.disableBody(true, true)) {
      this.soundbomb.play();
      this.gameOver = true;
    }
  }
  enemyFollows () {
    this.physics.moveToObject(this.enemigo, this.jugador, 100);
}
jugadorMuere(jugador, enemigo){
  if(enemigo.disableBody(true, true)){
    this.soundenemy.play();
    this.gameOver = true;
  }
}
}
