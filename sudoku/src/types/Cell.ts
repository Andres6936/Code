import {Optional} from "typescript-optional";
import {Coordinate} from "./Coordinate";

export class Cell {
    public constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly placeholder: boolean,
        public value: number,
    ) {
    }

    public getCoordinate(): Coordinate {
        return {
            x: this.x,
            y: this.y
        }
    }

    public isPlaceholder(): boolean {
        return this.placeholder;
    }

    public static isEqual(origin: Optional<Cell>, target: Optional<Cell>): boolean {
        if (origin.isEmpty() || target.isEmpty()) {
            return false;
        }

        return this.isEqualOf(origin.get(), target.get());
    }

    private static isEqualOf(origin: Cell, target: Cell): boolean {
        return origin.x === target.x && origin.y === target.y && origin.value === target.value
    }
}
