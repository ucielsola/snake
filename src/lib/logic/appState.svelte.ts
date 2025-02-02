import { Game } from "./game.svelte"

export const createApp = () => {
    let game: Game = null!

    function newGame() {
        game = new Game()
    }

    return {
        get gameInstance() {
            return game
        },

        newGame
    }
}

export const app = createApp()