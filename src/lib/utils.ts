import type { Position } from "./types";

export function isSamePosition(a: Position, b: Position): boolean {
    return a.x === b.x && a.y === b.y;
}