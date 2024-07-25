import Phaser from "phaser";
import BaseScene from "./BaseScene";

export default class Intro extends BaseScene {

    private text!: Phaser.GameObjects.Text;
    private fullText!: string;
    private currentText!: string;
    private letterIndex!: number;

	constructor() {
		super("Intro");
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

        this.fullText = "The Alchemist's Cottage";
        this.currentText = "";

        this.text = new Phaser.GameObjects.Text(this, centerX, centerY, "The Alchemist's Cottage", txtOptions);
		this.text.setOrigin(0.5, 0.5);
        this.add.existing(this.text);

        this.letterIndex = 0;
        this.time.addEvent({
            delay: 100, // Delay in milliseconds
            callback: this.addNextLetter,
            callbackScope: this,
            loop: true
        });
		
		this.events.emit("scene-awake");
	}

    addNextLetter() {
        // Check if there are more letters to add
        if (this.letterIndex < this.fullText.length) {
            // Add the next letter to the current text
            this.currentText += this.fullText[this.letterIndex];
            this.text.setText(this.currentText);

            // Increment the index for the next letter
            this.letterIndex++;
        } else {
            // Stop the timer once all letters are displayed
            this.time.removeAllEvents();

            this.time.delayedCall(100, this.fadeOutText, [], this);
        }
    }

    fadeOutText() {
        this.tweens.add({
            targets: this.text,
            alpha: 0,
            duration: 3000, // Duration of the fade out in milliseconds
            ease: 'Power2',
            onComplete: () => {
                // Optionally, do something after the fade out completes
                this.text.destroy();
            }
        });
    }

    create() {
        this.editorCreate();
    }
}
