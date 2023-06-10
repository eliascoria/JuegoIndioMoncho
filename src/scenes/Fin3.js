// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Fin3 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("fin3");
  }

  init(data) {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
    console.log(data);
    this.cantidadEstrellas = data.cantidadEstrellas;
  }

  create() {
    this.cantidadEstrellasTexto = this.add.text(
      15,
      15,
      "Estrellas recolectadas: " + this.cantidadEstrellas,
      { fontSize: "15px", fill: "#FFFFFF" }
    );
    this.finTexto = this.add.text(300, 250, "Ganaste", {
      fontSize: "50px",
      fill: "#FFFFFF",
    });
    this.add
      .image(400, 500, "menuu")
      .setScale(0.2)
      .setInteractive()
      .on("pointerdown", () => this.scene.start("Menu"));
  }
}
