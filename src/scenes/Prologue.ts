import Phaser from "phaser";
import FadeScript from "../scripts/FadeScript";
import { checkUrlParam } from "../utilities/GameUtils";

export default class Prologue extends Phaser.Scene {

    private buttonOutlineGraphics!: Phaser.GameObjects.Graphics;
    private buttonFillGraphics!: Phaser.GameObjects.Graphics;
    private buttonWidth: number = 200;
    private buttonHeight: number = 50;
    private buttonOutlineWidth: number = 5;

    private kettleProgress: number = 0;
    private textBox!: Phaser.GameObjects.Text;
    private textContent1: string = "You wake up to the sound of a tea kettle whistling. The bed you're in is warm and inviting. You feel sad for some reason, though you're not sure why.";
    private buttonContent1: string = "Pick up kettle";
    private textContent2: string = "The tea smells floral and like a delicate spice. You know there are teacups in the kitchen, though you can't remember ever being in the kitchen before.";
    private buttonContent2: string = "Go to kitchen";
    private textContent3: string = "You see a dusty kitchen nook.";
    
    private currentTextContent: string;
    private textIndex: number = 0;
    private typingEvent!: Phaser.Time.TimerEvent;
    private buttonContainer!: Phaser.GameObjects.Container;
    private buttonText!: Phaser.GameObjects.Text;

    constructor() {
        super("Prologue");
        this.currentTextContent = this.textContent1;
    }

    create() {
        this.cameras.main.setBackgroundColor('#dda15e');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.buttonOutlineGraphics = this.add.graphics();
        this.buttonFillGraphics = this.add.graphics();

        this.drawButton(0x283618);

        this.buttonText = this.add.text(0, 0, this.buttonContent1, {
            fontFamily: 'Arvo',
            fontSize: '24px',
            color: '#283618',
        });
        this.buttonText.setOrigin(0.5, 0.5);

        this.buttonContainer = this.add.container(centerX, centerY + 100, [this.buttonFillGraphics, this.buttonOutlineGraphics, this.buttonText]);

        this.buttonContainer.setSize(this.buttonWidth, this.buttonHeight);
        this.buttonContainer.setInteractive({ useHandCursor: true });
        this.buttonContainer.setAlpha(0);

        this.buttonContainer.on('pointerover', this.onButtonHover, this);
        this.buttonContainer.on('pointerout', this.onButtonOut, this);
        this.buttonContainer.on('pointerdown', this.onButtonClick, this);

        this.textBox = this.add.text(centerX - this.buttonWidth, centerY - 150, '', {
            fontFamily: 'Arvo',
            fontSize: '24px',
            color: '#000000',
            align: 'left',
            wordWrap: { width: this.buttonWidth * 2, useAdvancedWrap: true }
        });
        this.textBox.setOrigin(0, 0);

        let delay = 50;
        if (checkUrlParam("fast", "true")) {
            delay = 10;
        }
        this.typingEvent = this.time.addEvent({
            delay,
            callback: this.renderText,
            callbackScope: this,
            loop: true
        });
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

    private renderText() {
        if (this.textIndex < this.currentTextContent.length) {
            this.textBox.text += this.currentTextContent[this.textIndex];
            this.textIndex++;
        } else {
            this.typingEvent.remove();
            if (this.currentTextContent === this.textContent1) {
                this.fadeInButton(this.buttonContent1);
            } else if (this.currentTextContent === this.textContent2) {
                this.time.delayedCall(500, () => this.fadeInButton(this.buttonContent2), [], this);
            }
        }
    }

    private renderNewText(newText: string) {
        let delay = 50;
        if (checkUrlParam("fast", "true")) {
            delay = 10;
        }
        this.textBox.setText('');
        this.textBox.alpha = 1;
        this.currentTextContent = newText;
        this.textIndex = 0;
        this.typingEvent = this.time.addEvent({
            delay,
            callback: this.renderText,
            callbackScope: this,
            loop: true
        });
    }

    private fadeInButton(newLabel: string) {
        this.buttonText.setText(newLabel);
        this.buttonContainer.setVisible(true);
        new FadeScript(this, this.buttonContainer as Phaser.GameObjects.Container & Phaser.GameObjects.Components.Alpha, true, 1000);
    }

    private onButtonHover() {
        this.drawButton(0xbc6c25);
    }

    private onButtonOut() {
        this.drawButton(0x283618);
    }

    private onButtonClick() {
        let duration = 5000;
        if (checkUrlParam("fast", "true")) {
            duration = 500;
        }
        this.tweens.add({
            targets: this,
            kettleProgress: { from: 0, to: this.buttonWidth },
            duration,
            onUpdate: () => {
                this.drawButton(0xbc6c25);
            },
            onComplete: () => {
                this.kettleProgress = 0;
                this.drawButton(0x283618);
                this.fadeOutButtonAndText(() => {
                    if (this.buttonText.text === this.buttonContent2) {
                        this.renderNewText(this.textContent3);
                    } else {
                        this.renderNewText(this.textContent2);
                    }
                });
            }
        });
    }

    private fadeOutButtonAndText(callback: () => void) {
        new FadeScript(this, this.buttonContainer as Phaser.GameObjects.Container & Phaser.GameObjects.Components.Alpha, false, 3000);
        new FadeScript(this, this.textBox as Phaser.GameObjects.Text & Phaser.GameObjects.Components.Alpha, false, 3000, () => {
            this.textBox.alpha = 1;
            callback();
        });
    }
}
