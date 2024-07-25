import Phaser from "phaser";
import { checkUrlParam } from "../utilities/GameUtils";

export default class FadeScript {
    constructor(
        scene: Phaser.Scene,
        fadeObject: Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Alpha,
        fadeIn: boolean,
        duration: number = 3000,
        onCompleteCallback?: () => void
    ) {
        if (fadeIn) {
            fadeObject.setAlpha(0);
        } else {
            fadeObject.setAlpha(1);
        }

        if (checkUrlParam("fast", "true")) {
            duration = 500;
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