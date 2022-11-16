import {Player} from "../pages/players/player";
import React from "react";

const PlayerTableRecord = (props: {player: Player}) => {
    return <tr key={props.player.id}>
        <td className="players-table-data-image">
            <div className="player-info-container">
                <img className="players-image" data-testid="playerImage" src={`https://crafatar.com/avatars/${props.player.id}` } />
                <span data-testid="playerName" className="player-name">{props.player.name}</span>
            </div>
        </td>
        <td className="players-table-data" data-testid="playerDeathCount">{props.player.deaths.length}</td>
    </tr>
}
export default PlayerTableRecord;