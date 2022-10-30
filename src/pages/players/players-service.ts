import {Player} from "./player";

class PlayersService {
    async getPlayers() : Promise<Player[]> {
        const result = await fetch(`${process.env.REACT_APP_API_URL}v1/Player/`)
        return await result.json();
    }
}

export default PlayersService
