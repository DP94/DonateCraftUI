import {Revival} from "./revival";
import PlayersService from "../players/players-service";

class RevivalService {
    async getRevivals(): Promise<Revival[]> {
        try {
            const result = await fetch(`${process.env.REACT_APP_API_URL}v1/Lock`);
            const revivals: Revival[] = await result.json();

            const players = await new PlayersService().getPlayers();
            for (let i = 0; i < revivals.length; i++) {
                const player = players.find(player => player.id === revivals[i].id);
                if (!player) {
                    continue;
                }
                revivals[i].name = player.name;

            }
            
            return revivals;
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}

export default RevivalService;