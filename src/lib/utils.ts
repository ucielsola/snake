import type { Position } from "$lib/types";

export function isSamePosition(a?: Position, b?: Position): boolean {
    if (!b || !a) return false;

    return a.x === b.x && a.y === b.y;
}