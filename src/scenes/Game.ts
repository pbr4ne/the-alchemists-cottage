import Phaser from "phaser";
import FadeScript from "../scripts/FadeScript";

export default class Game extends Phaser.Scene {

	private buttonContainer!: Phaser.GameObjects.Container;

	constructor() {
		super("Game");
	}

	create() {
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

		let introText = new Phaser.GameObjects.Text(this, centerX, centerY, "Start", txtOptions);
		introText.setOrigin(0.5, 0.5);
        this.add.existing(introText);

		new FadeScript(this, introText, true, 3000);
	}
}
