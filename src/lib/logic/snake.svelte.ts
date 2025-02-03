import { Direction, FoodType, type Position, type Potion } from "$lib/types"
import { isSamePosition } from "$lib/utils";

export class Snake {
    position: {
        head: Position,
        body: Position[]
    } = $state({
        head: { x: 0, y: 0 },
        body: []
    })

    #foodEaten = $state<FoodType[]>([])


    #currentPotion = $state<Potion | undefined>();
    #lastDirection: Direction = $state()!

    get currentPotion() {
        return this.#currentPotion;
    }

    get lastDirection() {
        return this.#lastDirection;
    }

    get foodEaten() {
        return this.#foodEaten;
    }

    setInitialPosition(initialPosition: Position) {
        this.position.head = initialPosition;
    }

    changeDirection(newDirection: Direction) {
        if (this.#lastDirection === newDirection) return

        const isFirstMovement = !this.#lastDirection
        this.#lastDirection = newDirection;

        if (isFirstMovement) this.move(newDirection)
    }

    eat(foodType: FoodType, direction: Direction) {
        switch (foodType) {
            case FoodType.Poison:
                return;
            case FoodType.Apple:
                this.grow(direction);
                break
            case FoodType.SlowPotion:
                this.#currentPotion = FoodType.SlowPotion;
                break;
            case FoodType.FastPotion:
                this.#currentPotion = FoodType.FastPotion;
                break;
        }

        this.#foodEaten.push(foodType);
    }

    move(direction: Direction) {
        const currentHead = { ...this.position.head };

        switch (direction) {
            case Direction.Up:
                this.position.head.y -= 1;
                break;
            case Direction.Right:
                this.position.head.x += 1;
                break;
            case Direction.Down:
                this.position.head.y += 1;
                break;
            case Direction.Left:
                this.position.head.x -= 1;
                break;
        }

        let previousPosition = currentHead;
        this.position.body = this.position.body.map((segment) => {
            const temp = { ...segment };
            segment.x = previousPosition.x;
            segment.y = previousPosition.y;
            previousPosition = temp;
            return segment;
        });
    }

    resetPotion() {
        this.#currentPotion = undefined;
    }


    isBodyPosition(position: Position): boolean {
        return !!this.position.body.find((p) => isSamePosition(p, position))
    }

    private grow(direction: Direction) {
        const lastBodyPart = this.position.body[this.position.body.length - 1] || this.position.head;
        const newBodyPart = {
            x: lastBodyPart.x + (direction === Direction.Left ? 1 : direction === Direction.Right ? -1 : 0),
            y: lastBodyPart.y + (direction === Direction.Up ? 1 : direction === Direction.Down ? -1 : 0),
        };

        this.position.body.push(newBodyPart);
    }
};