import React from "react";
import CharityService from "./charity-service";
import Charity from "./charity";
import './Charity.css';
import LoadingSpinner from "../../loader/LoadingSpinner";
import PlayersService from "../players/players-service";
import PlayerSelector from "../../modals/PlayerSelector";
import {Player} from "../players/player";
import {toast} from "react-toastify";

class Charities extends React.Component<{}, {charities: Charity[], players: Player[], charityId: number, loading: boolean, showPlayerSelector: boolean}> {
    
    charityService = new CharityService();
    playerService = new PlayersService();
    playerId = '';
    donorId = '';
    
    constructor(props: any) {
        super(props);
        this.state = {
            charities: [],
            players: [],
            loading: false,
            showPlayerSelector: false,
            charityId: 0
        }
        const params = new URLSearchParams(window.location.search);
        this.playerId = params.get('playerId') ?? '';
        this.donorId = params.get('donorId') ?? '';
    }
    
    async componentDidMount() {
        this.setState({
            loading: true
        })
        const charityIds: Charity[] = await this.charityService.getCharityIds();
        for (let i = 0; i < charityIds.length; i++) {
            const charityId = charityIds[i].id;
            try {
                const charityDetails = await this.charityService.getCharityDetails(charityId);
                this.setState( {
                    charities : [...this.state.charities, charityDetails]
                });
            } catch(e) {
                //Some charities can not be found
                console.log(e);
            }
        }
        this.setState({
            loading: false
        })
    }

    async charityDonateButtonClicked(charity: Charity) {
        
        if (!this.playerId) {
            await this.setState({
                loading: true
            })
            const players = await this.playerService.getPlayers();
            await this.setState({
                players: players,
                showPlayerSelector: true,
                loading: false,
                charityId: charity.id
            })
            return;
        }
        
        let url = `${process.env.REACT_APP_JG_DONATE_URL}${charity.id}?exiturl=${process.env.REACT_APP_API_URL}v1/Callback?data=JUSTGIVING-DONATION-ID~${this.playerId}`;
        if (this.donorId && this.donorId !== '') {
            url += `~${this.donorId}`;
        }
        window.location.replace(url);
    }

    onModalPlayerSelected = (currentPlayer: Player, selectedPlayer: Player) => {
        this.setState({
            showPlayerSelector: false
        })
        if (!selectedPlayer.isDead) {
            toast.error(`Cannot donate for ${selectedPlayer.name} as they are not dead. If they have recently died, please refresh this page.`, {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        let url = `${process.env.REACT_APP_JG_DONATE_URL}${this.state.charityId}?exiturl=${process.env.REACT_APP_API_URL}v1/Callback?data=JUSTGIVING-DONATION-ID~${selectedPlayer.id}`;
        window.location.replace(url);
    }

    toggleModal = () => {
        this.setState({
            showPlayerSelector: !this.state.showPlayerSelector
        })
    }

    render() {
        if (this.state && this.state.charities && this.state.charities.length !== 0 && !this.state.loading){
            return (
                <div>
                    <PlayerSelector players={this.state.players} currentPlayer='' show={this.state.showPlayerSelector} toggle={this.toggleModal} playerSelected={this.onModalPlayerSelected}/>
                    <table className="charity-table table-striped table table-hover table-responsive table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th></th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.charities.map((charity) => (
                                    <tr className="charity-row" key={charity.id}>
                                        <td className="charity-table-data"><img className="charity-image"
                                                                                src={charity.logoAbsoluteUrl}/></td>
                                        <td className="charity-table-data"><p>{charity.name}</p></td>
                                        <td className="charity-table-data">
                                            <button className="btn btn-success charity-button" onClick={() => this.charityDonateButtonClicked(charity)}>Donate</button>
                                        </td>
                                        <td className="charity-table-data"><p>{charity.description}</p></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )
        } else if (this.state && this.state.charities && this.state.charities.length == 0 && !this.state.loading) {
            return <div className="no-players-text"><span data-testid="noPlayers">No charities ☹</span></div>
        } else {
            return <LoadingSpinner/>
        }
    }
}

export default Charities;