import Phaser from 'phaser';
import FadeScript from '../scripts/FadeScript';
import { getTypingDelay } from '../utilities/Timing';

export default class DescriptionBox extends Phaser.GameObjects.Container {
    private textBox: Phaser.GameObjects.Text;
    private textContent: string;
    private textIndex: number = 0;
    private typingEvent!: Phaser.Time.TimerEvent;
    private typingDelay: number;
    private onCompleteCallback?: () => void;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, textContent: string, onCompleteCallback?: () => void) {
        super(scene, x, y);

        this.textContent = textContent;
        this.typingDelay = getTypingDelay();
        this.onCompleteCallback = onCompleteCallback;

        this.textBox = scene.add.text(0, 0, '', {
            fontFamily: 'Arvo',
            fontSize: '24px',
            color: '#283618',
            align: 'left',
            wordWrap: { width: width * 2, useAdvancedWrap: true }
        });
        this.textBox.setOrigin(0, 0);

        this.add(this.textBox);
        scene.add.existing(this);

        this.startTyping(scene);
    }

    private startTyping(scene: Phaser.Scene) {
        this.typingEvent = scene.time.addEvent({
            delay: this.typingDelay,
            callback: this.renderText,
            callbackScope: this,
            loop: true
        });
    }

    private renderText() {
        if (this.textIndex < this.textContent.length) {
            this.textBox.text += this.textContent[this.textIndex];
            this.textIndex++;
        } else {
            this.typingEvent.remove();
            if (this.onCompleteCallback) {
                this.onCompleteCallback();
            }
        }
    }

    public updateText(newText: string, onCompleteCallback?: () => void) {
        this.textBox.setText('');
        this.textBox.alpha = 1;
        this.textContent = newText;
        this.textIndex = 0;
        this.onCompleteCallback = onCompleteCallback;
        this.startTyping(this.scene);
    }

    public fadeOut(callback: () => void) {
        new FadeScript(this.scene, this.textBox as Phaser.GameObjects.Text & Phaser.GameObjects.Components.Alpha, false, callback);
    }
}
