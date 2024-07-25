import Phaser from "phaser";
import ActionButton from "../prefabs/ActionButton";
import DescriptionBox from "../prefabs/DescriptionBox";
import { KETTLE_ACTION, KITCHEN_ACTION } from "../actions/ActionConstants";
import { eventBus } from "../utilities/EventBus";

export default class Prologue extends Phaser.Scene {

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

        this.button = new ActionButton(this, centerX, centerY + 100, KETTLE_ACTION);

        eventBus.on(KETTLE_ACTION.getName(), () => {
            this.descriptionBox.updateText(this.textContent2);
            this.button = new ActionButton(this, this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, KITCHEN_ACTION);
        });

        eventBus.on(KITCHEN_ACTION.getName(), () => {
            this.descriptionBox.updateText(this.textContent3);
            this.button.destroy();
        });
    }
}
