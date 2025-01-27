import { Game } from "./game.svelte"

export const createApp = () => {
    let game: Game = null!

    function newGame() {
        game = new Game()
    }

    return {
        get game() {
            return game
        },

        newGame
    }
}

export const app = createApp()