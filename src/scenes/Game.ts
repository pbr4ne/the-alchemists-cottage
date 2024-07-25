import Phaser from "phaser";
import FadeScript from "../scripts/FadeScript";

export default class Game extends Phaser.Scene {

    private buttonOutlineGraphics!: Phaser.GameObjects.Graphics;
    private buttonFillGraphics!: Phaser.GameObjects.Graphics;
    private buttonWidth: number = 200;
    private buttonHeight: number = 50;
    private buttonOutlineWidth: number = 5;

    private kettleProgress: number = 0;

    constructor() {
        super("Game");
    }

    create() {
        this.cameras.main.setBackgroundColor('#dda15e');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.buttonOutlineGraphics = this.add.graphics();
        this.buttonFillGraphics = this.add.graphics();

        this.drawButton(0x283618);

        const buttonText = this.add.text(0, 0, "Pick up kettle", {
            fontFamily: 'Arvo',
            fontSize: '24px',
            color: '#283618',
        });
        buttonText.setOrigin(0.5, 0.5);

        const buttonContainer = this.add.container(centerX, centerY, [this.buttonFillGraphics, this.buttonOutlineGraphics, buttonText]);

        buttonContainer.setSize(this.buttonWidth, this.buttonHeight);
        buttonContainer.setInteractive({ useHandCursor: true });

        buttonContainer.on('pointerover', this.onButtonHover, this);
        buttonContainer.on('pointerout', this.onButtonOut, this);
        buttonContainer.on('pointerdown', this.onButtonClick, this);

        new FadeScript(this, buttonContainer as unknown as Phaser.GameObjects.Container & Phaser.GameObjects.Components.Alpha, true, 3000);
    }

    private drawButton(outlineColor: number) {
        const x = -this.buttonWidth / 2;
        const y = -this.buttonHeight / 2;
        const outlineWidth = this.buttonOutlineWidth;

        this.buttonOutlineGraphics.clear();
        this.buttonOutlineGraphics.lineStyle(outlineWidth, outlineColor, 1);
        this.buttonOutlineGraphics.strokeRect(x, y, this.buttonWidth, this.buttonHeight);

        this.buttonFillGraphics.clear();
        if (this.kettleProgress > 0) {
            this.buttonFillGraphics.fillStyle(0xffb703, 1);
            this.buttonFillGraphics.fillRect(x, y, this.kettleProgress, this.buttonHeight);
        }
    }

    private onButtonHover() {
        this.drawButton(0xbc6c25);
    }

    private onButtonOut() {
        this.drawButton(0x283618);
    }

    private onButtonClick() {
        this.tweens.add({
            targets: this,
            kettleProgress: { from: 0, to: this.buttonWidth },
            duration: 5000,
            onUpdate: () => {
                this.drawButton(0xbc6c25);
            },
            onComplete: () => {
                this.kettleProgress = 0;
                this.drawButton(0x283618);
            }
        });
    }
}
