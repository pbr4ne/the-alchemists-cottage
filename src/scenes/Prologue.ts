import Phaser from "phaser";
import ActionButton from "../prefabs/ActionButton";
import DescriptionBox from "../prefabs/DescriptionBox";
import FadeScript from "../scripts/FadeScript";

export default class Prologue extends Phaser.Scene {

    private button!: ActionButton;
    private descriptionBox!: DescriptionBox;

    private textContent1: string = "You wake up to the sound of a tea kettle whistling. The bed you're in is warm and inviting. You feel sad for some reason, though you're not sure why.";
    private buttonContent1: string = "Pick up kettle";
    private textContent2: string = "The tea smells floral and like a delicate spice. You know there are teacups in the kitchen, though you can't remember ever being in the kitchen before.";
    private buttonContent2: string = "Go to kitchen";
    private textContent3: string = "You see a dusty kitchen nook.";
    
    private currentTextContent: string = "";
    private buttonWidth: number = 200;

    constructor() {
        super("Prologue");
        this.currentTextContent = this.textContent1;
    }

    create() {
        this.cameras.main.setBackgroundColor('#dda15e');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.descriptionBox = new DescriptionBox(this, centerX - this.buttonWidth, centerY - 150, this.buttonWidth, this.currentTextContent, () => {
            this.fadeInButton(this.buttonContent1);
        });

        this.button = new ActionButton(this, centerX, centerY + 100, this.buttonContent1, () => {
            this.fadeOutButtonAndText(() => {
                if (this.button.getButtonText() === this.buttonContent2) {
                    this.renderFinalText(this.textContent3);
                } else {
                    this.renderNewText(this.textContent2, this.buttonContent2);
                }
            });
        });
        this.button.setAlpha(0);
    }

    private renderNewText(newText: string, newButtonLabel: string) {
        this.descriptionBox.updateText(newText, () => {
            this.fadeInButton(newButtonLabel);
        });
        this.currentTextContent = newText;
    }

    private renderFinalText(finalText: string) {
        this.descriptionBox.updateText(finalText);
    }

    private fadeInButton(newLabel: string) {
        this.button.resetButton(newLabel);
    }

    private fadeOutButtonAndText(callback: () => void) {
        new FadeScript(this, this.button as unknown as Phaser.GameObjects.Container & Phaser.GameObjects.Components.Alpha, false);
        this.descriptionBox.fadeOut(callback);
    }
}
