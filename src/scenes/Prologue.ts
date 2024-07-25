import Phaser from "phaser";
import ActionButton from "../prefabs/ActionButton";
import DescriptionBox from "../prefabs/DescriptionBox";
import { PROLOGUE_KETTLE_ACTION, PROLOGUE_KITCHEN_ACTION } from "../actions/ActionConstants";
import { eventBus } from "../utilities/EventBus";

export default class Prologue extends Phaser.Scene {

    private descriptionBox!: DescriptionBox;
    private textContent1: string = "You wake up to the sound of a tea kettle whistling. The bed you're in is warm and inviting. You feel sad for some reason, though you're not sure why.";
    private textContent2: string = "The tea smells floral and delicately spiced. You know there are teacups in the kitchen, though you can't remember ever being in the kitchen before.";

    constructor() {
        super("Prologue");
    }

    create() {
        this.cameras.main.setBackgroundColor('#dda15e');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.descriptionBox = new DescriptionBox(this, centerX - 200, centerY - 150, 200, this.textContent1);

        let button = new ActionButton(this, centerX, centerY + 100, PROLOGUE_KETTLE_ACTION);

        eventBus.on(PROLOGUE_KETTLE_ACTION.getName(), () => {
            this.descriptionBox.updateText(this.textContent2);
            button.destroy();
            button = new ActionButton(this, this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, PROLOGUE_KITCHEN_ACTION);
        });

        eventBus.on(PROLOGUE_KITCHEN_ACTION.getName(), () => {
            this.scene.start("Game");
        });

        this.events.emit("scene-awake");
    }
}
