import React from "react";
import PlayersService from "./players-service";
import {Player} from "./player";
import {Donation} from "./donation";
import './Player.css';

class Players extends React.Component<{}, { players: Player[] }> {

    playerService = new PlayersService();
    timer : number = 0;
    
    constructor(props: any) {
        super(props);
        this.state = {
            players: []
        }        
    }
    
    async componentDidMount() {        
        await this.getPlayers();
        this.timer = window.setInterval(()=> this.getPlayers(), 15000);
    }
    
    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    async getPlayers(){
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
    
    onPlayerDonateClicked(player: Player) {
        window.location.replace(`/charities?playerId=${player.id}`);
    }
    
    render(){
        if (this.state && this.state.players.length !== 0){
            return (
                <div>
                    <table className="players-table table-striped table table-hover table-responsive table-bordered" data-testid="playersTable">
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
                                <tr className="players-row" key={player.id}>
                                    <td className="players-table-data">
                                        <img className="players-image" data-testid="playerImage" src={`https://crafatar.com/avatars/${player.id}` } />
                                    </td>
                                    <td className="players-table-data" data-testid="playerName"><p>{player.name}</p></td>
                                    <td className="players-table-data" data-testid="playerDeathReason">{player.deaths.length > 0 ? player.deaths[player.deaths.length - 1].reason : "No deaths!"}</td>
                                    <td className="players-table-data" data-testid="playerDeathStatus">
                                        {
                                            player.isDead ?
                                            <div>
                                                <p>Dead</p>
                                                <button className="btn btn-success player-donate-button" data-testid="playerDeadButton" onClick={() => this.onPlayerDonateClicked(player)}>Donate</button>
                                             </div> 
                                            : 
                                            "Alive"
                                        }
                                    </td>
                                    <td className="players-table-data" data-testid="playerDeathCount">{player.deaths.length}</td>
                                    <td className="players-table-data" data-testid="playerDonationSum">{this.getDonationTotal(player.donations)}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return <span data-testid="loadingText">Loading...</span>
        }
    }    
}

export default Players;