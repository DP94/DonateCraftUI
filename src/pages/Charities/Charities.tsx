import React from "react";
import CharityService from "./charity-service";
import Charity from "./charity";
import './Charity.css';

class Charities extends React.Component<{}, {charities: Charity[]}> {
    
    charityService = new CharityService();
    playerId = '';
    
    constructor(props: any) {
        super(props);
        this.state = {
            charities: []
        }
        const p = new URLSearchParams(window.location.search);
        this.playerId = p.get('playerId') ?? '';
    }
    
    async componentDidMount() {
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
    }
    
    charityDonateClicked(charity: Charity) {
        const url = `${process.env.REACT_APP_JG_DONATE_URL}${charity.id}?exiturl=${process.env.REACT_APP_API_URL}v1/Callback?data=JUSTGIVING-DONATION-ID~${this.playerId}`;
        window.location.replace(url);
    }

    render() {
        if (this.state && this.state.charities.length !== 0) {
            return (
                <div>
                    <table className="charity-table table-striped table table-hover table-responsive">
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
                                    <tr className="charity-row">
                                        <td className="charity-table-data"><img className="charity-image"
                                                                                src={charity.logoAbsoluteUrl}/></td>
                                        <td className="charity-table-data"><p>{charity.name}</p></td>
                                        <td className="charity-table-data">
                                            <button className="btn btn-success charity-button" onClick={() => this.charityDonateClicked(charity)}>Donate</button>
                                        </td>
                                        <td className="charity-table-data"><p>{charity.description}</p></td>
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

export default Charities;