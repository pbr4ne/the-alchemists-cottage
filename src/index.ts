import Phaser from "phaser";
import Intro from "./scenes/Intro";
import Preload from "./scenes/Preload";
import Prologue from "./scenes/Prologue";

const game = new Phaser.Game({
    width: 1920,
    height: 1080,
    backgroundColor: "#A9BA9D",
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    },
    scene: [Preload, Intro, Prologue],
    transparent: true,
    input: {
        activePointers: 3,
    }
});

game.scene.start("Preload");