import Phaser from 'phaser';
import { getFillDuration } from '../utilities/Timing';
import Action from '../actions/Action';
import { eventBus } from '../utilities/EventBus';

export default class ActionButton extends Phaser.GameObjects.Container {
    private action: Action;
    private outlineGraphics: Phaser.GameObjects.Graphics;
    private fillGraphics: Phaser.GameObjects.Graphics;
    private buttonImage: Phaser.GameObjects.Image;
    private buttonWidth: number = 80;
    private buttonHeight: number = 80;
    private buttonOutlineWidth: number = 5;
    private buttonPadding: number = 20;
    private actionProgress: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, action: Action) {
        super(scene, x, y);

        this.action = action;

        this.outlineGraphics = scene.add.graphics();
        this.fillGraphics = scene.add.graphics();

        this.buttonImage = scene.add.image(0, 0, this.action.getTexture()).setDisplaySize(this.buttonWidth, this.buttonHeight);

        this.add(this.fillGraphics);
        this.add(this.outlineGraphics);
        this.add(this.buttonImage);

        this.setSize(this.buttonWidth, this.buttonHeight);
        this.setInteractive({ useHandCursor: true });

        this.on('pointerover', this.onButtonHover, this);
        this.on('pointerout', this.onButtonOut, this);
        this.on('pointerdown', this.onButtonClick, this);

        scene.add.existing(this);
        this.drawButton(0x283618);
    }

    private drawButton(outlineColor: number) {
        const x = -this.buttonWidth / 2;
        const y = -this.buttonHeight / 2;

        this.outlineGraphics.clear();
        this.outlineGraphics.lineStyle(this.buttonOutlineWidth, outlineColor, 1);
        this.outlineGraphics.strokeRect(x - this.buttonPadding, y - this.buttonPadding, this.buttonWidth + (this.buttonPadding * 2), this.buttonHeight + (this.buttonPadding * 2));

        this.fillGraphics.clear();
        if (this.actionProgress > 0) {
            this.fillGraphics.fillStyle(0xffb703, 1);
            this.fillGraphics.fillRect(x - this.buttonPadding, y - this.buttonPadding, this.actionProgress, this.buttonHeight + (this.buttonPadding * 2));
        }
    }

    private onButtonHover() {
        this.drawButton(0xbc6c25);
    }

    private onButtonOut() {
        this.drawButton(0x283618);
    }

    private onButtonClick() {
        let duration = getFillDuration();
        this.scene.tweens.add({
            targets: this,
            actionProgress: { from: 0, to: this.buttonWidth + (this.buttonPadding * 2) },
            duration,
            onUpdate: () => {
                this.drawButton(0xbc6c25);
            },
            onComplete: () => {
                this.actionProgress = 0;
                this.drawButton(0x283618);
                this.setVisible(false);
                eventBus.emit(this.action.getName()); 
            }
        });
    }
}
