import {Player} from "./player";

class PlayersService {
    async getPlayers(): Promise<Player[]> {
        try {
            const result = await fetch(`${process.env.REACT_APP_API_URL}v1/Player?sortBy=deaths&sortOrder=desc`)
            return await result.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}

export default PlayersService
