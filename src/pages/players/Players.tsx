﻿import React from "react";
import PlayersService from "./players-service";
import {Player} from "./player";
import {Donation} from "./donation";
import './Player.css';
import LoadingSpinner from "../../loader/LoadingSpinner";
import PlayerSelector from "../../modals/PlayerSelector";
import InactivityModal from "../../modals/InactivityModal";


export default class Players extends React.Component<{}, { players: Player[], loading: boolean, showPlayerSelector: boolean, showInactivityModal: boolean, currentRateLimit: number, currentPlayer: Player | null }> {

    playerService = new PlayersService();
    timer : number = 0;
    //5 minutes
    rateLimit: number = 30;
    
    constructor(props: any) {
        super(props);
        this.state = {
            players: [],
            loading: false,
            showPlayerSelector: false,
            showInactivityModal: false,
            currentRateLimit: 0,
            currentPlayer: null
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

    async getPlayers() {
        if (this.state.currentRateLimit >= this.rateLimit) {
            this.setState({
                showInactivityModal: true,
                showPlayerSelector: false,
                loading: false,
            })
            return;
        }
        const playerList: Player[] = await this.playerService.getPlayers();
        this.setState({
            players : playerList,
            currentRateLimit : this.state.currentRateLimit + 1
        });
    }

    getDonationTotal(donations : Donation[]) : string {
        let total = 0;
        for (const donation of donations){
            total += donation.amount;
        }
        return total.toFixed(2);
    }
    
    onPlayerDonateClicked(currentPlayer: Player) {
        this.setState({
            showPlayerSelector: true,
            //Player is clearly active on page
            currentRateLimit : 0,
            currentPlayer: currentPlayer
        })
    }
    
    onModalPlayerSelected = (player: Player, donor: Player) => {
        this.setState({
            showPlayerSelector: false
        })
        let url = `/charities?playerId=${player.id}`;
        if (player.id !== donor.id) {
            url += `&donorId=${donor.id}`;
        }
        window.location.replace(url);
    }
    
    toggleModal = () => {
        this.setState({
            showPlayerSelector: !this.state.showPlayerSelector
        })
    }
    toggleInactivityModal = () => {
        this.setState({
            showInactivityModal: !this.state.showInactivityModal
        })
    }
    
    onInactivityModalContinuePressed = async () => {
        await this.setState({
            currentRateLimit : 0,
            showInactivityModal: false
        })
        this.getPlayers();
    }
    
    render(){
        if (this.state && this.state.players && this.state.players.length == 0 && !this.state.loading) {
            return <div className="no-players-text"><span data-testid="noPlayers">No players ☹</span></div>
        } else if (this.state.loading) {
            return <LoadingSpinner/>
        } else if (this.state && this.state.players && this.state.players.length !== 0){
            return (
                <div>
                    <InactivityModal show={this.state.showInactivityModal} toggle={this.toggleInactivityModal} continueButtonOnClick={this.onInactivityModalContinuePressed}/>
                    <PlayerSelector players={this.state.players} currentPlayer={this.state.currentPlayer} show={this.state.showPlayerSelector} toggle={this.toggleModal} playerSelected={this.onModalPlayerSelected}/>
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
                                    <td className="players-table-data-image">
                                        <div className="player-info-container">
                                            <img className="players-image" data-testid="playerImage" src={`https://crafatar.com/avatars/${player.id}` } />
                                            <span data-testid="playerName" className="player-name">{player.name}</span>
                                        </div>
                                    </td>
                                    <td className="players-table-data death-reason" data-testid="playerDeathReason">{player.deaths.length > 0 ? player.deaths[player.deaths.length - 1].reason : "No deaths!"}</td>
                                    <td className="players-table-data" data-testid="playerDeathStatus">
                                        {
                                            player.isDead ?
                                            <div className="player-dead">
                                                <span className="player-dead-text">Dead</span>
                                                <button className="btn btn-success player-donate-button" data-testid="playerDeadButton" onClick={() => this.onPlayerDonateClicked(player)}>Donate</button>
                                             </div> 
                                            : 
                                            <span className="player-alive-text">Alive</span>
                                        }
                                    </td>
                                    <td className="players-table-data" data-testid="playerDeathCount">{player.deaths.length}</td>
                                    <td className="players-table-data" data-testid="playerDonationSum">£{this.getDonationTotal(player.donations)}</td>
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