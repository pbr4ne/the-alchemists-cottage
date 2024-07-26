import Phaser from 'phaser';
import { getFillDuration } from '../utilities/Timing';
import Action from '../actions/Action';
import { eventBus } from '../utilities/EventBus';

export default class ActionButton extends Phaser.GameObjects.Container {
    private action: Action;
    private onClick: () => void;
    private buttonOutline: Phaser.GameObjects.Image;
    private fillGraphics: Phaser.GameObjects.Graphics;
    private buttonImage: Phaser.GameObjects.Image;
    private buttonWidth: number = 80;
    private buttonHeight: number = 80;
    private buttonPadding: number = 30;
    private actionProgress: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, action: Action, onClick?: () => void) {
        super(scene, x, y);

        this.action = action;
        this.onClick = onClick || (() => { });

        this.fillGraphics = scene.add.graphics();

        this.buttonOutline = scene.add.image(0, 0, 'square').setDisplaySize(this.buttonWidth + this.buttonPadding * 2, this.buttonHeight + this.buttonPadding * 2);

        this.buttonImage = scene.add.image(0, 0, this.action.getTexture()).setDisplaySize(this.buttonWidth, this.buttonHeight);

        this.add(this.fillGraphics);
        this.add(this.buttonOutline);
        this.add(this.buttonImage);

        this.setSize(this.buttonWidth + this.buttonPadding * 2, this.buttonHeight + this.buttonPadding * 2);
        this.setInteractive({ useHandCursor: true });

        this.on('pointerover', this.onButtonHover, this);
        this.on('pointerout', this.onButtonOut, this);
        this.on('pointerdown', this.onButtonClick, this);

        scene.add.existing(this);
    }

    private drawFill(width: number) {
        const x = -this.buttonWidth / 2 - this.buttonPadding + 5;
        const y = -this.buttonHeight / 2 - this.buttonPadding + 5;
        const height = this.buttonHeight + this.buttonPadding * 2 - 10;
        const radius = 20;
    
        this.fillGraphics.clear();
        this.fillGraphics.fillStyle(0xffb703, 1);
    
        if (width > 2 * radius) {
            this.fillGraphics.fillRoundedRect(x, y, width, height, { tl: radius, tr: radius, bl: radius, br: radius });
        } else {   
            if (width < 2 * radius) {
                if (width < radius) {
                    this.fillGraphics.fillRect(x, y + 13, width, height - 26);
                } else {
                    this.fillGraphics.fillRect(x, y + 13, width, height - 26);
                    this.fillGraphics.fillRect(x + 5, y + 6, width - 5, height - 13);
                }
            }
        }
    }    

    private onButtonHover() {
        this.buttonOutline.setTexture('square-highlight');
    }

    private onButtonOut() {
        this.buttonOutline.setTexture('square');
    }

    private onButtonClick() {
        let duration = getFillDuration();
        this.scene.tweens.add({
            targets: this,
            actionProgress: { from: 0, to: this.buttonWidth + this.buttonPadding * 2 - 10},
            duration,
            onUpdate: () => {
                this.drawFill(this.actionProgress);
            },
            onComplete: () => {
                this.actionProgress = 0;
                this.fillGraphics.clear();
                eventBus.emit(this.action.getName());
                this.onClick();
            }
        });
    }
}
