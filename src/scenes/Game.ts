import Phaser from "phaser";
import FadeScript from "../scripts/FadeScript";

export default class Game extends Phaser.Scene {

    constructor() {
        super("Game");
    }

    create() {
        this.cameras.main.setBackgroundColor('#dda15e');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const buttonOutline = this.add.graphics();
        const buttonWidth = 200;
        const buttonHeight = 50;
        const buttonRadius = 20;
        const buttonOutlineWidth = 5;

        buttonOutline.lineStyle(buttonOutlineWidth, 0x283618, 1); 
        buttonOutline.strokeRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, buttonRadius);

        const buttonText = this.add.text(0, 0, "Pick up kettle", {
            fontFamily: 'Arvo',
            fontSize: '24px',
            color: '#283618',
        });
        buttonText.setOrigin(0.5, 0.5);

        const buttonContainer = this.add.container(centerX, centerY, [buttonOutline, buttonText]);

        new FadeScript(this, buttonContainer as unknown as Phaser.GameObjects.Container & Phaser.GameObjects.Components.Alpha, true, 3000);
	}
}