import Phaser from "phaser";
import BaseScene from "./BaseScene";
import FadeScript from "../scripts/FadeScript";

export default class Intro extends BaseScene {

    private text!: Phaser.GameObjects.Text;
    private fullText!: string;
    private currentText!: string;
    private letterIndex!: number;

	constructor() {
		super("Intro");
	}

	protected create(): void {
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

        this.fullText = "The Alchemist's Cottage";
        this.currentText = "";

        this.text = new Phaser.GameObjects.Text(this, centerX, centerY, "", txtOptions);
		this.text.setOrigin(0.5, 0.5);
        this.add.existing(this.text);

        this.letterIndex = 0;
        this.time.addEvent({
            delay: 100,
            callback: this.addNextLetter,
            callbackScope: this,
            loop: true
        });
		
		this.events.emit("scene-awake");
	}

    private addNextLetter() {
        if (this.letterIndex < this.fullText.length) {
            this.currentText += this.fullText[this.letterIndex];
            this.text.setText(this.currentText);

            this.letterIndex++;
        } else {
            this.time.removeAllEvents();

            this.time.delayedCall(500, () => {
                new FadeScript(this, this.text, false, 3000, () => {
                    this.scene.start('Prologue');
                });
            });
        }
    }
}
