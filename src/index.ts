import Phaser from "phaser";
import Intro from "./scenes/Intro";
import Preload from "./scenes/Preload";
import Prologue from "./scenes/Prologue";
import Game from "./scenes/Game";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

const game = new Phaser.Game({
    width: 1920,
    height: 1080,
    backgroundColor: "#A9BA9D",
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    },
    scene: [Preload, Intro, Prologue, Game],
    transparent: true,
    input: {
        activePointers: 3,
    },
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: RexUIPlugin,
            mapping: 'rexUI'
        }]
    }
});

game.scene.start("Preload");