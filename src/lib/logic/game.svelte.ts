import { Direction, type Food, type Position, } from "$lib/types";
import { FoodType, GameStatus, CollisionType } from "$lib/types";

import { Snake } from "$lib/logic";
import { isSamePosition } from "$lib/utils";

export class Game {
    static ONE_SECOND = 1000;
    #status = $state<GameStatus>(GameStatus.NotStarted);
    #size: Position = null!
    #food = $state<Food[]>([]);
    #snake: Snake;
    #time: number = $state(0) // Time elapsed in seconds
    #lastMoveTime = performance.now();
    #gameInitTime = performance.now();
    #lastDirection: Direction = $state(null!);
    #directionChanged: boolean = false;
    #lastPotionTime: number | null = $state(null)
    #remainingPotionTime: number | null = $state(null)

    constructor() {
        this.#snake = new Snake();

        this.setupEffects();
    }

    get status() {
        return this.#status;
    }

    get time() {
        return this.#time;
    }

    get remainingPotionTime() {
        return this.#remainingPotionTime || 0 / 1000;
    }

    get size() {
        return this.#size;
    }

    get food() {
        return this.#food;
    }

    get lastDirection() {
        return this.#lastDirection;
    }

    get eaten() {
        return this.#snake.foodEaten
    }

    get snakePosition() {
        return this.#snake.position;
    }

    get currentPotion() {
        return this.#snake.currentPotion;
    }

    play() {
        if ([GameStatus.Won, GameStatus.Lost, GameStatus.Playing].includes(this.#status)) return;

        if (this.#status === GameStatus.NotStarted) {
            if (!this.#lastDirection) {
                this.#lastDirection = Direction.Up
            }

            this.gameLoop()
        }

        this.#status = GameStatus.Playing;
    }

    pause() {
        this.#status = GameStatus.Paused;
    }

    setBoardSize(size: Position) {
        this.#size = size;

        this.#snake.setBoundaries(size);

        this.#snake.setInitialPosition({
            x: Math.round(size.x / 2),
            y: Math.round(size.y / 2),
        });
    }

    changeSnakeDirection(direction: Direction) {
        if ([GameStatus.NotStarted, GameStatus.Paused].includes(this.#status)) {
            this.play();
        }

        const horizontals = [Direction.Left, Direction.Right]
        const verticals = [Direction.Up, Direction.Down]

        const allowedDirection = {
            [Direction.Up]: horizontals,
            [Direction.Down]: horizontals,
            [Direction.Left]: verticals,
            [Direction.Right]: verticals,
        }

        if (this.#directionChanged || !!this.#lastDirection && !allowedDirection[this.#lastDirection].includes(direction)) return;
        this.#directionChanged = true;
        this.#lastDirection = direction;
    }

    private detectCollision(newPosition: Position): CollisionType {
        let collision: CollisionType = CollisionType.None;

        if (this.#snake.isBodyPosition(newPosition)) {
            collision = CollisionType.Snake;
        } else if (newPosition.x < 0 || newPosition.y < 0) {
            collision = CollisionType.Wall;
        } else if (this.#food.find(f => isSamePosition(f.position, newPosition))) {
            collision = CollisionType.Food;
        }

        return collision
    }

    private setupEffects() {
        $effect.root(() => {
            $effect(() => {
                if (this.#status !== GameStatus.Playing) return;

                const collision = this.detectCollision(this.#snake.position.head)

                if (
                    collision === CollisionType.Wall ||
                    collision === CollisionType.Potion ||
                    collision === CollisionType.Snake
                ) {
                    this.#status = GameStatus.Lost;
                }

                if (collision === CollisionType.Food) {
                    this.feedSnake()
                }
            });
        });
    }

    private feedSnake() {
        let foodType: FoodType = null!
        let newFoodList: Food[] = []

        for (const food of this.#food) {
            if (isSamePosition(food.position, this.#snake.position.head)) {
                foodType = food.type
            } else {
                newFoodList.push(food)
            }
        }

        if (!foodType) return;

        this.#food = newFoodList

        const isPotion = [FoodType.SlowPotion, FoodType.FastPotion].includes(foodType)

        this.#lastPotionTime = isPotion ? performance.now() : Number(this.#lastPotionTime) + 0;
        this.#snake.eat(foodType, this.#lastDirection)
    }

    private getRandomFreePosition(): Position {
        const getRandomPosition = () => {
            const x = Math.floor(Math.random() * (this.#size.x - 2)) + 1;
            const y = Math.floor(Math.random() * (this.#size.y - 2)) + 1;

            return { x, y };
        }

        let position = getRandomPosition();

        while (!this.isFreeCell(position)) {
            position = getRandomPosition();
        }

        return position
    }

    private isFreeCell(cellPosition: Position): boolean {
        const isSnake = this.#snake.position.body.find((p) => isSamePosition(p, cellPosition))
        const isFood = this.#food.find((f) => isSamePosition(f.position, cellPosition))

        return !isSnake && !isFood
    }

    private gameLoop() {
        if (this.#status === GameStatus.Playing) {
            const baseSpeed = 500;
            const appleLimit = 3;
            const fastPotionLimit = 1
            const slowPotionLimit = 1;
            const potionDuration = 10000;

            const canAddApples = this.#food.filter(f => f.type === FoodType.Apple).length < appleLimit
            const canAddSlowPotions = this.currentPotion !== FoodType.SlowPotion && this.#food.filter(f => f.type === FoodType.SlowPotion).length < slowPotionLimit
            const canAddFastPotions = this.currentPotion !== FoodType.FastPotion && this.#food.filter(f => f.type === FoodType.FastPotion).length < fastPotionLimit

            const currentTime = performance.now();
            const potionMultiplier = this.currentPotion === FoodType.FastPotion ? 2 : this.currentPotion === FoodType.SlowPotion ? 0.5 : 1;
            const speedMultiplier = 1 + Math.log(((this.#snake.position.body.length + 1)));
            const timeElapsed = currentTime - this.#lastMoveTime;
            const timeSinceLastPotion = this.#lastPotionTime ? currentTime - this.#lastPotionTime : 0;

            if (this.#status === GameStatus.Playing) {
                this.#time = Math.floor((currentTime - this.#gameInitTime) / 1000);
            }

            if (this.#lastPotionTime) {
                this.#remainingPotionTime = Math.max(0, 10 - timeSinceLastPotion / 1000);
            }

            if (timeSinceLastPotion >= potionDuration) {
                this.#snake.resetPotion()
                this.#lastPotionTime = null;
            }

            if (timeElapsed >= baseSpeed / speedMultiplier / potionMultiplier) {
                this.#snake.move(this.#lastDirection)
                this.#directionChanged = false;
                this.#lastMoveTime = currentTime;
            }

            if (Math.round(Math.random()) && canAddApples) {
                this.#food.push({
                    type: FoodType.Apple,
                    position: this.getRandomFreePosition(),
                })
            }

            if (Math.round(Math.random()) && canAddSlowPotions) {
                this.#food.push({
                    type: FoodType.SlowPotion,
                    position: this.getRandomFreePosition(),
                })
            }

            if (Math.round(Math.random()) && canAddFastPotions) {
                this.#food.push({
                    type: FoodType.FastPotion,
                    position: this.getRandomFreePosition(),
                })
            }
        }

        requestAnimationFrame(() => this.gameLoop());
    }
}