import React, { useCallback, useState } from "react";
import './Home.css'
import PlayersService from "../players/players-service";
import { Player } from "../players/player";
import PlayerTableRecord from "../../table/PlayerTableRecord";
import CharityService from "../Charities/charity-service";
import Charity from "../Charities/charity";
import LoadingSpinner from "../../loader/LoadingSpinner";
import InactivityModal from "../../modals/InactivityModal";
import { useInactivityPoller } from "../../hooks/useInactivityPoller";

const playerService = new PlayersService();
const charityService = new CharityService();

function Home() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [charities, setCharities] = useState<Charity[]>([]);

    const fetchTableData = useCallback(async () => {
        const nextPlayers = await playerService.getPlayers();
        const nextCharities: Charity[] = await charityService.getCharityIds();
        for (const charity of nextCharities) {
            try {
                charity.justGivingCharity = await charityService.getCharityDetails(charity.id);
            } catch (e) {
                //Some charities can not be found
                console.log(e);
            }
        }
        setPlayers(nextPlayers);
        setCharities(nextCharities);
    }, []);

    const {
        initialLoading,
        showInactivityModal,
        toggleInactivityModal,
        onInactivityContinue,
    } = useInactivityPoller(fetchTableData, { intervalMs: 10000, maxTicks: 30 });

    if (initialLoading) {
        return <LoadingSpinner/>;
    }
    return (
        <div>
            <InactivityModal show={showInactivityModal} toggle={toggleInactivityModal} continueButtonOnClick={onInactivityContinue}/>
            <h1 className="title">DonateCraft</h1>
            <div className="leaderboards">
                <div className="death-leaderboard-container">
                    <p className="most-deaths">Most deaths</p>
                    <table
                        className="death-leaderboard-table table-striped table table-hover table-responsive table-bordered">
                        <tbody>
                        {
                            players.map((player) => (
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
                            charities.map((charity) => (
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
    );
}

export default Home;
