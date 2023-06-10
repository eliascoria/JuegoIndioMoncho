// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Menu extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Menu");
  }
  create() {
    this.add.image(400, 300, "background").setScale(0.5).setInteractive();
    this.add.image(400, 100, "title").setScale(1).setInteractive();
    this.add
      .image(400, 500, "playb")
      .setScale(0.2)
      .setInteractive()
      .on("pointerdown", () => this.scene.start("juego"));
  }
}