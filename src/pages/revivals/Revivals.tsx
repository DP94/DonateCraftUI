import React from "react";
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
        await this.setState({
            currentRateLimit : 0,
            showInactivityModal: false
        })
        this.getRevivals();
    }
    
    getProgessForRevival = (status: RevivalStatus) => {
        switch (status) {
            case RevivalStatus.Created:
                return 0;
            case RevivalStatus.Processing:
                    return 0.5;
            case RevivalStatus.Unlocked:
            case RevivalStatus.Error:
                return 1;
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
                                        <th>Status</th>
                                        <th>Progress</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.revivals.map(revival => (
                                            <tr className="players-row" key={revival.id}>
                                                <td className="players-table-data">{revival.id}</td>
                                                <td className="players-table-data">{RevivalStatus[revival.status]}</td>
                                                <td><progress value={this.getProgessForRevival(revival.status)} /></td>
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