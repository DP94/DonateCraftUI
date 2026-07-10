import React, { useCallback, useState } from "react";
import PlayersService from "./players-service";
import { Player } from "./player";
import { Donation } from "./donation";
import './Player.css';
import LoadingSpinner from "../../loader/LoadingSpinner";
import PlayerSelector from "../../modals/PlayerSelector";
import InactivityModal from "../../modals/InactivityModal";
import { useInactivityPoller } from "../../hooks/useInactivityPoller";

const playerService = new PlayersService();

function getDonationTotal(donations: Donation[]): string {
    let total = 0;
    for (const donation of donations) {
        total += donation.amount;
    }
    return total.toFixed(2);
}

export default function Players() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [showPlayerSelector, setShowPlayerSelector] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    const fetchPlayers = useCallback(async () => {
        const playerList = await playerService.getPlayers();
        setPlayers(playerList);
    }, []);

    const {
        initialLoading,
        showInactivityModal,
        toggleInactivityModal,
        onInactivityContinue,
        resetActivity,
    } = useInactivityPoller(fetchPlayers, { intervalMs: 10000, maxTicks: 30 });

    const [buyCreditsMode, setBuyCreditsMode] = useState(false);

    const onPlayerDonateClicked = (player: Player) => {
        setBuyCreditsMode(false);
        setShowPlayerSelector(true);
        setCurrentPlayer(player);
        resetActivity();
    };

    const onBuyRevivalsClicked = () => {
        setBuyCreditsMode(true);
        setShowPlayerSelector(true);
        setCurrentPlayer(null);
        resetActivity();
    };

    const onModalPlayerSelected = (player: Player, donor: Player) => {
        setShowPlayerSelector(false);
        if (buyCreditsMode) {
            window.location.replace(`/charities?playerId=${donor.id}&mode=credits`);
            return;
        }
        let url = `/charities?playerId=${player.id}`;
        if (player.id !== donor.id) {
            url += `&donorId=${donor.id}`;
        }
        window.location.replace(url);
    };

    const toggleModal = () => setShowPlayerSelector(prev => !prev);

    if (players.length === 0 && !initialLoading) {
        return <div className="no-players-text"><span data-testid="noPlayers">No players ☹</span></div>;
    }
    if (initialLoading) {
        return <LoadingSpinner/>;
    }
    return (
        <div>
            <InactivityModal show={showInactivityModal} toggle={toggleInactivityModal} continueButtonOnClick={onInactivityContinue}/>
            <PlayerSelector players={players} currentPlayer={currentPlayer} show={showPlayerSelector && !showInactivityModal} toggle={toggleModal} playerSelected={onModalPlayerSelected}/>
            <div className="players-actions">
                <button className="btn btn-success buy-revivals-button" data-testid="buyRevivalsButton" onClick={onBuyRevivalsClicked}>Buy Revivals</button>
            </div>
            <table className="players-table table-striped table table-hover table-responsive table-bordered" data-testid="playersTable">
                <thead className="table-light">
                    <tr>
                        <th>Player</th>
                        <th>Last Death Reason</th>
                        <th>Status</th>
                        <th>Death Count</th>
                        <th>Dontation Total</th>
                        <th>Revival Credits</th>
                    </tr>
                </thead>
                <tbody>
                {
                    players.map((player) => (
                        <tr className="players-row" key={player.id}>
                            <td className="players-table-data-image">
                                <div className="player-info-container">
                                    <img className="players-image" data-testid="playerImage" src={`https://crafthead.net/avatar/${player.id}`} />
                                    <span data-testid="playerName" className="player-name">{player.name}</span>
                                </div>
                            </td>
                            <td className="players-table-data death-reason" data-testid="playerDeathReason">{player.deaths.length > 0 ? player.deaths[player.deaths.length - 1].reason : "No deaths!"}</td>
                            <td className="players-table-data" data-testid="playerDeathStatus">
                                {
                                    player.isDead ?
                                    <div className="player-dead">
                                        <span className="player-dead-text">Dead</span>
                                        <button className="btn btn-success player-donate-button" data-testid="playerDeadButton" onClick={() => onPlayerDonateClicked(player)}>Donate</button>
                                     </div>
                                    :
                                    <span className="player-alive-text">Alive</span>
                                }
                            </td>
                            <td className="players-table-data" data-testid="playerDeathCount">{player.deaths.length}</td>
                            <td className="players-table-data" data-testid="playerDonationSum">£{getDonationTotal(player.donations)}</td>
                            <td className="players-table-data player-credits" data-testid="playerCredits">
                                <span className={(player.credits ?? 0) > 0 ? "credits-active" : "credits-empty"}>{player.credits ?? 0} / 5</span>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}
