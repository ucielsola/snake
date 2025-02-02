export enum GameStatus {
    NotStarted = 0,
    Playing = 1,
    Paused = 2,
    Won = 3,
    Lost = 4
}

export enum FoodType {
    Apple = 'apple',
    Poison = 'poison',
    SlowPotion = 'slow',
    FastPotion = 'fast',
}

export type Potion = FoodType.SlowPotion | FoodType.FastPotion | FoodType.Poison

export enum Direction {
    Up = 'up',
    Right = 'right',
    Down = 'down',
    Left = 'left',
}

export type Food = {
    type: FoodType
    position: {
        x: number
        y: number
    }
}

export enum CollisionType {
    None = 0,
    Wall = 1,
    Potion = 2,
    Snake = 3,
    Food = 4,
}

export type Position = { x: number, y: number }
