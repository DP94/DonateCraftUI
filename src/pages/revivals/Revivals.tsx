import React from "react";
import RevivalService from "./revival-service";
import {Revival} from "./revival";
import LoadingSpinner from "../../loader/LoadingSpinner";
import InactivityModal from "../../modals/InactivityModal";
import {RevivalStatus} from "./revival-status";
import {ProgressBar} from "react-bootstrap";

class Revivals extends React.Component<{}, {revivals: Revival[], loading: boolean, showPlayerSelector: boolean, showInactivityModal: boolean, currentRateLimit: number}> {

    revivalService = new RevivalService();
    timer : number = 0;
    //5 minutes
    rateLimit: number = 30;
    
    constructor(props: any) {
        super(props);
        this.state = {
            revivals: [],
            loading: false,
            showPlayerSelector: false,
            showInactivityModal: false,
            currentRateLimit: 0
        }
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });
        await this.getRevivals();
        this.setState({
            loading: false,
        });
        this.timer = window.setInterval(()=> this.getRevivals(), 10000);
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }
    
    async getRevivals() {
        if (this.state.currentRateLimit >= this.rateLimit) {
            this.setState({
                showInactivityModal: true,
                showPlayerSelector: false,
                loading: false,
            })
            return;
        }
        const revivals = await this.revivalService.getRevivals();
        this.setState({
            revivals: revivals,
            currentRateLimit : this.state.currentRateLimit + 1
        })
    }

    toggleInactivityModal = () => {
        this.setState({
            showInactivityModal: !this.state.showInactivityModal
        })
    }

    onInactivityModalContinuePressed = async () => {
        this.setState({
            currentRateLimit: 0,
            showInactivityModal: false
        })
        await this.getRevivals();
    }
    
    getProgressForRevival = (status: RevivalStatus) => {
        switch (status) {
            case RevivalStatus.Created:
                return 0.25;
            case RevivalStatus.Processing:
                    return 0.5;
            case RevivalStatus.Unlocked:
            case RevivalStatus.Error:
                return 1;
        }
    }

    getBackgroundForRevival = (status: RevivalStatus) => {
        switch (status) {
            case RevivalStatus.Created:
            case RevivalStatus.Processing:
                return 'info';
            case RevivalStatus.Unlocked:
                return 'success';
            case RevivalStatus.Error:
                return 'danger';
        }
    }

    getAnimatedForRevival = (status: RevivalStatus) => {
        switch (status) {
            case RevivalStatus.Created:
            case RevivalStatus.Processing:
                return true;
            case RevivalStatus.Unlocked:
            case RevivalStatus.Error:
                return false;
        }
    }

    render() {
        if (this.state.loading) {
            return <LoadingSpinner/>
        } else if (this.state && this.state.revivals) {
            return (
                <div>
                    <InactivityModal show={this.state.showInactivityModal} toggle={this.toggleInactivityModal} continueButtonOnClick={this.onInactivityModalContinuePressed}/>
                            <div>
                                <table className="players-table table-striped table table-hover table-responsive table-bordered">
                                    <thead className="table-light">
                                    <tr>
                                        <th>Revival</th>
                                        <th style={{minWidth: '150px'}}>Progress</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.revivals.map(revival => (
                                            <tr className="players-row" key={revival.id}>
                                                <td className="players-table-data">
                                                    <div className="player-info-container">
                                                        <img className="players-image" data-testid="playerImage"
                                                             src={`https://crafthead.net/avatar/${revival.id}`}/>
                                                        <span data-testid="playerName"
                                                              className="player-name">{revival.name}</span>
                                                    </div>
                                                </td>
                                                <td className="players-table-data"><ProgressBar
                                                    variant={this.getBackgroundForRevival(revival.status)}
                                                    animated={this.getAnimatedForRevival(revival.status)}
                                                    now={this.getProgressForRevival(revival.status)} max={1}/></td>
                                                <td className="players-table-data">{RevivalStatus[revival.status]}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>

                            </div>
                </div>
            )
        }
    }
}
export default Revivals;