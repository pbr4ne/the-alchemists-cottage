import Phaser from "phaser";
import { getFadeDuration } from "../utilities/Timing";

export default class FadeScript {
    constructor(
        scene: Phaser.Scene,
        fadeObject: Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Alpha,
        fadeIn: boolean,
        onCompleteCallback?: () => void,
        duration: number = getFadeDuration()
    ) {
        if (fadeIn) {
            fadeObject.setAlpha(0);
        } else {
            fadeObject.setAlpha(1);
        }

        scene.tweens.add({
            targets: fadeObject,
            alpha: fadeIn ? { from: 0, to: 1 } : { from: 1, to: 0 },
            duration: duration,
            ease: 'Power2',
            onComplete: () => {
                if (!fadeIn) {
                    fadeObject.setAlpha(0);
                }
                if (onCompleteCallback) {
                    onCompleteCallback();
                }
            }
        });
    }
}
