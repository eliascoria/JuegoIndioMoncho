export default class Precarga extends Phaser.Scene {
  // escena para optimiozar tiempos
  // carga el preload solo una vez y sirve para todo el juego
  constructor() {
    // key of the scene
    super("precarga");
  }

  preload() {
    // load assets
    this.load.tilemapTiledJSON("map", "./public/tilemaps/nivel1.json");
    this.load.tilemapTiledJSON("map2", "./public/tilemaps/nivel3.json");
    this.load.tilemapTiledJSON("map3", "./public/tilemaps/nivel2.json")
    this.load.image("tilesFondo", "./public/images/sky.png");
    this.load.image("tilesPlataforma", "./public/images/platform.png");
    this.load.image("flecha", "./public/images/flecha.png");
    this.load.image("menuu","./public/images/menu.png");
    this.load.image("level3", "./public/images/level3.png");
    this.load.image("reset","./public/images/reset.png");
    this.load.image("playb","./public/images/play.png");
    this.load.image("background","./public/images/background.jpg");
    this.load.image("title", "./public/images/title.png")
    this.load.image("bomb", "./public/images/bomb.png");
    this.load.image("star", "./public/images/star.png");
    this.load.image("enemigo","./public/images/enemigo.png");
    this.load.audio("jumpindio","./public/sounds/jumpninja.wav");
    this.load.audio("collectsound","./public/sounds/collectsound.wav");
    this.load.audio("explosion","./public/sounds/explosion.ogg");
    this.load.audio("enemysound", "./public/sounds/enemysound.wav");
    this.load.audio("spacemusic","./public/sounds/spacemusic.wav");
  

    this.load.spritesheet("dude", "./public/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.image("salida", "./public/images/salida.png");
  }

  create() {
    //  Our player animations, turning, walking left and walking right.
    // se crea una sola vez, para que no de error en el restart de la escena
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // init scene juego
    this.scene.start("Menu");
  }
}
