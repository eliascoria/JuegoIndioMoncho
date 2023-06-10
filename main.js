import Juego from "./src/scenes/Juego.js";
import Precarga from "./src/scenes/Precarga.js";
import Fin from "./src/scenes/Fin.js";
import GameOver from "./src/scenes/GameOver.js";
import Juego2 from "./src/scenes/Juego2.js";
import Juego3 from "./src/scenes/juego3.js";
import Fin2 from "./src/scenes/Fin2.js";
import Menu from "./src/scenes/Menu.js";
import Fin3 from "./src/scenes/Fin3.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Precarga, Juego, Fin, GameOver, Juego2, Juego3, Fin2, Menu, Fin3],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
