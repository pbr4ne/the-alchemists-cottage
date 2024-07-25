import BaseScene from "./BaseScene";
import ActionButton from "../prefabs/ActionButton";
import DescriptionBox from "../prefabs/DescriptionBox";
import { GO_TO_KITCHEN, PICK_UP_KETTLE } from "../utilities/ActionConstants";

export default class Prologue extends BaseScene {

    private button!: ActionButton;
    private descriptionBox!: DescriptionBox;
    private textContent1: string = "You wake up to the sound of a tea kettle whistling. The bed you're in is warm and inviting. You feel sad for some reason, though you're not sure why.";
    private textContent2: string = "The tea smells floral and like a delicate spice. You know there are teacups in the kitchen, though you can't remember ever being in the kitchen before.";
    private textContent3: string = "You see a dusty kitchen nook.";
    
    constructor() {
        super("Prologue");
    }

    create() {
        this.cameras.main.setBackgroundColor('#dda15e');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.descriptionBox = new DescriptionBox(this, centerX - 200, centerY - 150, 200, this.textContent1);

        this.button = new ActionButton(this, centerX, centerY + 100, PICK_UP_KETTLE, () => {
            if (this.button.getButtonText() === GO_TO_KITCHEN) {
                this.renderText(this.textContent3);
            } else {
                this.renderText(this.textContent2, GO_TO_KITCHEN);
            }
        });
    }

    private renderText(text: string, buttonLabel?: string) {
        this.descriptionBox.updateText(text);
        if (buttonLabel) {
            this.button.resetButton(buttonLabel);
        }
    }
}
