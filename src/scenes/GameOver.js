export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }
  create() {
    // this.finGameOverText = this.add.text(250, 150, "Se acabo el tiempo", {
    //   fontSize: "30px",
    //   fill: "#ffffff",
    // });
    this.finGameOverText = this.add.text(300, 250, "Perdiste", {
      fontSize: "50px",
      fill: "#FFFFFF",
    });
    this.add
      .image(400, 500, "reset")
      .setScale(0.2)
      .setInteractive()
      .on("pointerdown", () => this.scene.start("juego"));
    
  }

  }
