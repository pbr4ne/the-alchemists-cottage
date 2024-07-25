import Phaser from "phaser";
import FadeScript from "../scripts/FadeScript";
import ActionButton from "../prefabs/ActionButton";
import { checkUrlParam } from "../utilities/GameUtils";

export default class Prologue extends Phaser.Scene {

    private button!: ActionButton;
    private textBox!: Phaser.GameObjects.Text;
    private textContent1: string = "You wake up to the sound of a tea kettle whistling. The bed you're in is warm and inviting. You feel sad for some reason, though you're not sure why.";
    private buttonContent1: string = "Pick up kettle";
    private textContent2: string = "The tea smells floral and like a delicate spice. You know there are teacups in the kitchen, though you can't remember ever being in the kitchen before.";
    private buttonContent2: string = "Go to kitchen";
    private textContent3: string = "You see a dusty kitchen nook.";
    
    private currentTextContent: string;
    private textIndex: number = 0;
    private typingEvent!: Phaser.Time.TimerEvent;
    private buttonWidth: number = 200;

    constructor() {
        super("Prologue");
        this.currentTextContent = this.textContent1;
    }

    create() {
        this.cameras.main.setBackgroundColor('#dda15e');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.textBox = this.add.text(centerX - this.buttonWidth, centerY - 150, '', {
            fontFamily: 'Arvo',
            fontSize: '24px',
            color: '#000000',
            align: 'left',
            wordWrap: { width: this.buttonWidth * 2, useAdvancedWrap: true }
        });
        this.textBox.setOrigin(0, 0); // Set origin to top-left to avoid moving

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

        this.button = new ActionButton(this, centerX, centerY + 100, this.buttonContent1, () => {
            this.fadeOutButtonAndText(() => {
                if (this.button.getButtonText() === this.buttonContent2) {
                    this.renderNewText(this.textContent3);
                } else {
                    this.renderNewText(this.textContent2);
                }
            });
        });
        this.button.setAlpha(0);
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
        this.button.resetButton(newLabel);
    }

    private fadeOutButtonAndText(callback: () => void) {
        new FadeScript(this, this.button as unknown as Phaser.GameObjects.Container & Phaser.GameObjects.Components.Alpha, false, 3000);
        new FadeScript(this, this.textBox as Phaser.GameObjects.Text & Phaser.GameObjects.Components.Alpha, false, 3000, () => {
            this.textBox.alpha = 1;
            callback();
        });
    }
}
