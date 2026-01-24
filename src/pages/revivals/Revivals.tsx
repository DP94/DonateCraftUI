import React from "react";
import {Player} from "../players/player";
import RevivalService from "./revival-service";
import {Revival} from "./revival";
import LoadingSpinner from "../../loader/LoadingSpinner";
import InactivityModal from "../../modals/InactivityModal";
import {RevivalStatus} from "./revival-status";

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
        await this.setState({
            currentRateLimit : 0,
            showInactivityModal: false
        })
        this.getRevivals();
    }


    render() {
        if (this.state.loading) {
            return <LoadingSpinner/>
        } else if (this.state && this.state.revivals) {
            return (
                <div>
                    <InactivityModal show={this.state.showInactivityModal} toggle={this.toggleInactivityModal} continueButtonOnClick={this.onInactivityModalContinuePressed}/>
                    {
                        this.state.revivals.map(revival => (
                            <div key={revival.id}>
                                <h1>{revival.id}</h1>
                                <h1>{RevivalStatus[revival.status]}</h1>
                            </div>

                            ))
                    }
                </div>
            )
        }
    }
}
export default Revivals;