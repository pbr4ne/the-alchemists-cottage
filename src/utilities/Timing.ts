import { checkUrlParam } from "./GameUtils";

export function getTypingDelay(): number {
    return checkUrlParam("fast", "true") ? 10 : 50;
}

export function getFadeDuration(): number {
    return checkUrlParam("fast", "true") ? 500 : 3000;
}

export function getFillDuration(): number {
    return checkUrlParam("fast", "true") ? 500 : 5000;
}