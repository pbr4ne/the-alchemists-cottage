import Phaser from 'phaser';
import RoundedRectangleWithBorder from '../ui/RoundedRectangleWithBorder';

export default class Game extends Phaser.Scene {
    private print!: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'Game' });
    }

    create() {
        this.cameras.main.setBackgroundColor('#dda15e');

        const borderColor = 0x000000;
        const borderWidth = 2;

        const panel = new RoundedRectangleWithBorder(this, 800, 800, { bl: 10, br: 10, tr: 10, tl: 0 }, 0xbc6c25, borderColor, borderWidth);
        const topButton1 = new RoundedRectangleWithBorder(this, 100, 50, { bl: 0, br: 0, tl: 10, tr: 10 }, 0x606c38, borderColor, borderWidth);
        const topButton2 = new RoundedRectangleWithBorder(this, 100, 50, { bl: 0, br: 0, tl: 10, tr: 10 }, 0x606c38, borderColor, borderWidth);
        const topButton3 = new RoundedRectangleWithBorder(this, 100, 50, { bl: 0, br: 0, tl: 10, tr: 10 }, 0x606c38, borderColor, borderWidth);

        const tabs = this.rexUI.add.tabs({
            x: 500,
            y: 500,
            panel: panel,

            topButtons: [topButton1, topButton2, topButton3],

            space: {
                topButton: 5,
            }
        })
        .layout();

        this.print = this.add.text(0, 0, '');
        tabs.on('button.click', (button: any, groupName: string, index: number) => {
            this.print.text += `${groupName}-${index}\n`;
        });
    }

    update() {}
}