import Phaser from 'phaser';
import FadeScript from '../scripts/FadeScript';
import { getFillDuration } from '../utilities/Timing';

export default class ActionButton extends Phaser.GameObjects.Container {
    private outlineGraphics: Phaser.GameObjects.Graphics;
    private fillGraphics: Phaser.GameObjects.Graphics;
    private buttonText: Phaser.GameObjects.Text;
    private buttonWidth: number;
    private buttonHeight: number;
    private buttonOutlineWidth: number;
    private actionProgress: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, label: string, onClick: () => void) {
        super(scene, x, y);

        this.buttonWidth = 200;
        this.buttonHeight = 50;
        this.buttonOutlineWidth = 5;

        this.outlineGraphics = scene.add.graphics();
        this.fillGraphics = scene.add.graphics();

        this.buttonText = scene.add.text(0, 0, label, {
            fontFamily: 'Arvo',
            fontSize: '24px',
            color: '#283618',
        });
        this.buttonText.setOrigin(0.5, 0.5);

        this.add(this.fillGraphics);
        this.add(this.outlineGraphics);
        this.add(this.buttonText);

        this.setSize(this.buttonWidth, this.buttonHeight);
        this.setInteractive({ useHandCursor: true });

        this.on('pointerover', this.onButtonHover, this);
        this.on('pointerout', this.onButtonOut, this);
        this.on('pointerdown', () => {
            this.onButtonClick(onClick);
            this.emit('buttonClicked');
        }, this);

        scene.add.existing(this);
        this.drawButton(0x283618);
    }

    private drawButton(outlineColor: number) {
        const x = -this.buttonWidth / 2;
        const y = -this.buttonHeight / 2;

        this.outlineGraphics.clear();
        this.outlineGraphics.lineStyle(this.buttonOutlineWidth, outlineColor, 1);
        this.outlineGraphics.strokeRect(x, y, this.buttonWidth, this.buttonHeight);

        this.fillGraphics.clear();
        if (this.actionProgress > 0) {
            this.fillGraphics.fillStyle(0xffb703, 1);
            this.fillGraphics.fillRect(x, y, this.actionProgress, this.buttonHeight);
        }
    }

    private onButtonHover() {
        this.drawButton(0xbc6c25);
    }

    private onButtonOut() {
        this.drawButton(0x283618);
    }

    private onButtonClick(onClick: () => void) {
        let duration = getFillDuration();
        this.scene.tweens.add({
            targets: this,
            actionProgress: { from: 0, to: this.buttonWidth },
            duration,
            onUpdate: () => {
                this.drawButton(0xbc6c25);
            },
            onComplete: () => {
                this.actionProgress = 0;
                this.drawButton(0x283618);
                this.setVisible(false);
                onClick();
            }
        });
    }

    public resetButton(label: string) {
        this.buttonText.setText(label);
        this.setVisible(true);
        new FadeScript(this.scene, this as unknown as Phaser.GameObjects.Container & Phaser.GameObjects.Components.Alpha, true);
    }

    public getButtonText(): string {
        return this.buttonText.text;
    }
}
