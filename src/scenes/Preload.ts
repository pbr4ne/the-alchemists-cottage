import Phaser from "phaser";
import assetPackUrl from "../../static/assets/asset-pack.json";
import WebFont from 'webfontloader';

export default class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");
	}

	editorCreate(): void {
		this.events.emit("scene-awake");
	}

	async preload() {

		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        WebFont.load({
            google: {
                families: ['Playwrite FR Trad:wght@100..400']
            },
            active: () => {
                this.editorCreate();
            }
        }); 

		this.load.pack("asset-pack", assetPackUrl);
	}

	create() {
		this.loadFonts(() => {
			this.scene.start("Game");
		});
	}

	private loadFonts(callback: () => void) {
		WebFont.load({
			google: {
				families: ['Playwrite FR Trad:wght@100..400']
			},
			active: callback,
			inactive: () => {
				console.error('Failed to load fonts');
				callback();
			}
		});
	}
}
