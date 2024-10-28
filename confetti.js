import confetti from "https://cdn.skypack.dev/canvas-confetti@1.4.0";

export function launchConfetti() {
    confetti({
        particleCount: 100,
        angle: 60,
        spread: 100,
        origin: { x: 0, y: 1 }
    });

    confetti({
        particleCount: 100,
        angle: 120,
        spread: 100,
        origin: { x: 1, y: 1 }
    });
}
