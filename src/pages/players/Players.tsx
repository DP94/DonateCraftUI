import React from "react";
import PlayersService from "./players-service";
import {Player} from "./player";
import {Donation} from "./donation";
import './Player.css';

class Players extends React.Component<{}, { players: Player[] }> {

    playerService = new PlayersService();
    
    constructor(props: any) {
        super(props);
        this.state = {
            players: []
        }        
    }
    
    async componentDidMount() {
        const playerList: Player[] = await this.playerService.getPlayers();
        this.setState({
            players : playerList
        });
    }

    getDonationTotal(donations : Donation[]) : number {
        let total = 0;
        for (const donation of donations){
            total += donation.amount;
        }
        return total;
    }
    
    render(){
        if (this.state && this.state.players.length !== 0){
            return (
                <div>
                    <table className="players-table table-striped table table-hover table-responsive">
                        <thead className="table-light">
                            <tr>
                                <th></th>
                                <th>Player</th>
                                <th>Last Death Reason</th>
                                <th>Status</th>
                                <th>Death Count</th>
                                <th>Dontation Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.players.map((player) => (
                                <tr className="players-row">
                                    <td className="players-table-data">
                                        <img className="players-image" src={`https://crafatar.com/avatars/${player.id}`} />
                                    </td>
                                    <td className="players-table-data"><p>{player.name}</p></td>
                                    <td className="players-table-data">{player.deaths.length > 0 ? player.deaths[player.deaths.length - 1].reason : "No deaths!"}</td>
                                    <td className="players-table-data"> TODO! </td>
                                    <td className="players-table-data">{player.deaths.length}</td>
                                    <td className="players-table-data">{this.getDonationTotal(player.donations)}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return <span>Loading...</span>
        }
    }    
}

export default Players;