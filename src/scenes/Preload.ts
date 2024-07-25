import Phaser from "phaser";
import WebFont from 'webfontloader';
import assetPackUrl from "../../static/assets/asset-pack.json";
import { checkUrlParam } from "../utilities/GameUtils";

export default class Preload extends Phaser.Scene {

    constructor() {
        super("Preload");
    }

    protected async preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.pack("asset-pack", assetPackUrl);
    }

    protected create() {
        this.loadFonts(() => {
            if (checkUrlParam("fast", "true")) {
                this.scene.start("Game");
            } else {
                this.scene.start("Intro");
            }
        });
    }

    private loadFonts(callback: () => void) {
        WebFont.load({
            google: {
                families: ['Playwrite FR Trad:wght@100..400', 'Arvo']
            },
            active: callback,
            inactive: () => {
                console.error('Failed to load fonts');
                callback();
            }
        });
    }
}
