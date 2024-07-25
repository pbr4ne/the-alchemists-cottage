import Phaser from "phaser";
import BaseScene from "./BaseScene";

export default class Game extends BaseScene {

	constructor() {
		super("Game");
	}

	editorCreate(): void {
        super.create();

        this.cameras.main.setBackgroundColor('#dda15e');

		const txtOptions: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: 'Playwrite FR Trad',
            fontSize: '48px',
            color: '#283618',
            padding: { x: 5, y: 5 },
            align: 'center'
        };

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const text = new Phaser.GameObjects.Text(this, centerX, centerY, "The Alchemist's Cottage", txtOptions);
		text.setOrigin(0.5, 0.5);
        this.add.existing(text);
		
		this.events.emit("scene-awake");
	}

    create() {
        this.editorCreate();
    }
}
