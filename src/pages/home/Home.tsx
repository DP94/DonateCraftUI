import React from "react";
import './Home.css'
import PlayersService from "../players/players-service";
import {Player} from "../players/player";
import PlayerTableRecord from "../../table/PlayerTableRecord";
import CharityService from "../Charities/charity-service";
import Charity from "../Charities/charity";
import LoadingSpinner from "../../loader/LoadingSpinner";
import InactivityModal from "../../modals/InactivityModal";

class Home extends React.Component<{}, {players: Player[], charities: Charity[], loading: boolean, showInactivityModal: boolean, requestSent: number}> {

    playerService = new PlayersService();
    charityService = new CharityService();

    timer: number = 0;
    //5 minutes
    rateLimit: number = 30;

    constructor(props: {}) {
        super(props);
        this.state = {
            charities: [],
            players: [],
            loading: false,
            showInactivityModal: false,
            requestSent: 0
        }
    }

    async componentDidMount() {
        await this.setState({
            loading: true,
        });
        await this.getTableData();
        await this.setState({
            loading: false,
        });
        this.timer = window.setInterval(() => this.getTableData(), 10000);
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    async getTableData() {
        if (this.state?.requestSent >= this.rateLimit) {
            this.setState({
                showInactivityModal: true,
                loading: false,
            })
            return;
        }
        const players = await this.playerService.getPlayers();
        const charities: Charity[] = await this.charityService.getCharityIds();
        for (let i = 0; i < charities.length; i++) {
            const charity = charities[i];
            try {
                charity.justGivingCharity = await this.charityService.getCharityDetails(charity.id);
            } catch (e) {
                //Some charities can not be found
                console.log(e);
            }
        }
        await this.setState({
            players: players,
            charities: charities,
            requestSent: this.state?.requestSent + 1
        });
    }

    toggleInactivityModal = () => {
        this.setState({
            showInactivityModal: !this.state.showInactivityModal
        })
    }
    
    onInactivityModalContinuePressed = async () => {
        await this.setState({
            requestSent : 0,
            showInactivityModal: false
        })
        this.getTableData();
    }

    render() {
        if (this.state?.loading) {
            return <LoadingSpinner/>
        } else {
            return (
                <div>
                    <InactivityModal show={this.state?.showInactivityModal} toggle={this.toggleInactivityModal} continueButtonOnClick={this.onInactivityModalContinuePressed}/>
                    <h1 className="title">DonateCraft</h1>
                    <div className="leaderboards">
                        <div className="death-leaderboard-container">
                            <p className="most-deaths">Most deaths</p>
                            <table
                                className="death-leaderboard-table table-striped table table-hover table-responsive table-bordered">
                                <tbody>
                                {
                                    this.state?.players?.map((player) => (
                                        <PlayerTableRecord player={player}/>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="top-charity-leaderboard-container">
                            <p className="most-deaths">Charity donation count</p>
                            <table
                                className="charity-leaderboard-table table-striped table table-hover table-responsive table-bordered">
                                <tbody>
                                {
                                    this.state?.charities?.map((charity) => (
                                        <tr key={charity.id}>
                                            <td className="charity-table-data">
                                                <span>{charity.justGivingCharity.name}</span></td>
                                            <td className="charity-table-data charity-table-data-donations">{charity.donationCount}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            )
        }
    }
}

export default Home;