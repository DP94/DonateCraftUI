import React from "react";
import PlayersService from "./players-service";
import {Player} from "./player";
import {Donation} from "./donation";
import './Player.css';
import LoadingSpinner from "../../loader/LoadingSpinner";
import PlayerSelector from "./PlayerSelector";

class Players extends React.Component<{}, { players: Player[], loading: boolean, showModal: boolean }> {

    playerService = new PlayersService();
    timer : number = 0;
    
    constructor(props: any) {
        super(props);
        this.state = {
            players: [],
            loading: false,
            showModal: false
        }        
    }
    
    async componentDidMount() {
        this.setState({
            loading: true,
        });
        await this.getPlayers();
        this.setState({
            loading: false,
        });
        this.timer = window.setInterval(()=> this.getPlayers(), 10000);
    }
    
    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    async getPlayers(){
        const playerList: Player[] = await this.playerService.getPlayers();
        this.setState({
            players : playerList,
        });
    }

    getDonationTotal(donations : Donation[]) : number {
        let total = 0;
        for (const donation of donations){
            total += donation.amount;
        }
        return total;
    }
    
    onPlayerDonateClicked() {
        this.setState({
            showModal: true
        })
    }
    
    onModalPlayerSelected = (playerId: string, donorId: string) => {
        this.setState({
            showModal: false
        })
        let url = `/charities?playerId=${playerId}`;
        if (playerId !== donorId) {
            url += `&donorId=${donorId}`;
        }
        window.location.replace(url);
    }
    
    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    
    render(){
        if (this.state && this.state.players && this.state.players.length == 0 && !this.state.loading) {
            return <div className="no-players-text"><span data-testid="noPlayers">No players ☹</span></div>
        } else if (this.state.loading) {
            return <LoadingSpinner/>
        } else if (this.state && this.state.players && this.state.players.length !== 0){
            return (
                <div>
                    <table className="players-table table-striped table table-hover table-responsive table-bordered" data-testid="playersTable">
                        <thead className="table-light">
                            <tr>
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
                                    <PlayerSelector players={this.state.players} currentPlayer={player.id} show={this.state.showModal} toggle={this.toggleModal} playerSelected={this.onModalPlayerSelected}/>
                                    <td className="players-table-data-image">
                                        <img className="players-image" data-testid="playerImage" src={`https://crafatar.com/avatars/${player.id}` } />
                                        <span data-testid="playerName" className="player-name">{player.name}</span>
                                    </td>
                                    <td className="players-table-data death-reason" data-testid="playerDeathReason">{player.deaths.length > 0 ? player.deaths[player.deaths.length - 1].reason : "No deaths!"}</td>
                                    <td className="players-table-data" data-testid="playerDeathStatus">
                                        {
                                            player.isDead ?
                                            <div className="player-dead">
                                                <span className="player-dead-text">Dead</span>
                                                <button className="btn btn-success player-donate-button" data-testid="playerDeadButton" onClick={() => this.onPlayerDonateClicked()}>Donate</button>
                                             </div> 
                                            : 
                                            <span className="player-alive-text">Alive</span>
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
        }
    }    
}

export default Players;